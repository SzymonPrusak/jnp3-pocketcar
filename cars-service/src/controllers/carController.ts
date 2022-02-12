import { Request, Response } from 'express';
import { CarModel, CarAccessModel, CarBookModel, getAccesses, dropCacheAccesses } from '../model/carModel';
import { validateNewCar, validateCarUpdate } from '../utils/carSchema';
import { eventRedisClient } from '../utils/redisCon';


export class CarController {
  public static listCars(req: Request, res: Response) {
    const token = req.userToken;
    if (!token) {
      res.sendStatus(401);
      return;
    }

    CarAccessModel.find({ userId: token.id })
      .populate({
        path: 'car',
        model: 'Car',
        populate: {
          path: 'book',
          model: 'CarBook'
        }
      })
      .exec((err, accesses) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        const cars = accesses.map(a => a.car);
        return res.status(200).json(cars);
      });
  }

  public static addCar(req: Request, res: Response) {
    const token = req.userToken;
    if (!token) {
      res.sendStatus(401);
      return;
    }

    const { error, value } = validateNewCar(req.body);
    if (error) {
      res.status(400).send({ message: error });
      return;
    }
    const bookJson = value.book;

    const carBook = new CarBookModel(bookJson);
    const car = new CarModel({
      ...value,
      book: carBook
    });

    car.save((err, car) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!car) {
        res.status(500).send({ message: 'Could not create car' });
        return;
      }

      const carAccess = new CarAccessModel({
        car: car._id,
        userId: token.id,
        role: 'owner'
      })

      car.save();
      carBook.save();
      carAccess.save();

      res.status(200).json(car);

      const eventArgs = {
        userId: token.id,
        car: car
      };
      eventRedisClient.publish('car_added', JSON.stringify(eventArgs));
    });
  }

  public static async updateCar(req: Request, res: Response) {
    const token = req.userToken;
    if (!token) {
      res.sendStatus(401);
      return;
    }

    const { error, value } = validateCarUpdate(req.body);
    if (error) {
      res.status(400).send({ message: error });
      return;
    }
    const bookJson = value.book;

    const access = (await getAccesses(value._id))
      .find(a => a.userId = token.id);
    
    if (!access || access.role == 'viewer') {
      res.sendStatus(403);
      return;
    }

    CarModel.findByIdAndUpdate(value._id, value).exec();
    if (bookJson) {
      CarBookModel.findByIdAndUpdate(bookJson._id, bookJson).exec();
    }
    res.sendStatus(200);
  }

  public static deleteCar(req: Request, res: Response) {
    const token = req.userToken;
    if (!token) {
      res.sendStatus(401);
      return;
    }

    const { carId } = req.params;

    CarModel.findById(carId)
      .exec(async (err, car) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        if (!car) {
          return res.sendStatus(404);
        }

        const access = (await getAccesses(car._id))
          .find(a => a.userId == token.id);

        if (!access || access.role != 'owner') {
          return res.sendStatus(403);
        }

        dropCacheAccesses(car._id)
          .then(() => {
            CarAccessModel.deleteMany({ car: car._id }).exec();
            CarBookModel.deleteOne({ _id: car.book }).exec();
            car.delete();
          })
        return res.sendStatus(200);
      });
  }
}
