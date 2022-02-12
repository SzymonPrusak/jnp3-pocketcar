import { Request, Response } from 'express';
import { CarModel, CarAccessModel, CarBookModel } from '../model/carModel';
import { validateNewCar, validateCarUpdate } from '../utils/carSchema';


export class CarController {
  public static listCars(req: Request, res: Response) {
    const token = req.userToken;
    if (!token) {
      res.sendStatus(401);
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
    });
  }

  public static updateCar(req: Request, res: Response) {
    const token = req.userToken;
    if (!token) {
      res.sendStatus(401);
    }

    const { error, value } = validateCarUpdate(req.body);
    if (error) {
      res.status(400).send({ message: error });
      return;
    }
    const bookJson = value.book;

    CarModel.findOneAndUpdate(value._id, value).exec();
    if (bookJson) {
      CarBookModel.findOneAndUpdate(bookJson._id, bookJson).exec();
    }
    res.sendStatus(200);
  }

  public static deleteCar(req: Request, res: Response) {
    const token = req.userToken;
    if (!token) {
      res.sendStatus(401);
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
        
        let canRemove = true;
        await CarAccessModel.findOne({ car: car._id, userId: token.id })
          .exec((err, access) => {
            if (err || !access || access.role != 'owner') {
              canRemove = false;
            }
          });
        if (!canRemove) {
          return res.sendStatus(401);
        }

        CarAccessModel.deleteMany({ car: car._id }).exec();
        CarBookModel.deleteOne({ _id: car.book }).exec();
        car.delete();
        return res.sendStatus(200);
      });
  }
}
