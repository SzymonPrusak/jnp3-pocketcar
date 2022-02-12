import { Request, Response } from 'express';
import { SpendingModel } from '../model/spendingModel';
import { validateAddSpending, validateUpdateSpending } from '../utils/spendingSchema';

export class SpendingsController {
  public static getSpendings(req: Request, res: Response) {
    const { carId } = req.params;

    SpendingModel.find({carId}, (err, results) => {
      if(err) {
        return res.status(500).send({ message: err });
      }
      return res.status(200).json(results);
    });
  }

  public static addSpending(req: Request, res: Response) {
    const { error, value } = validateAddSpending(req.body);
    if (error) {
      res.status(400).send({ message: error });
      return;
    }

    const spending = new SpendingModel({
      name: value.name,
      cost: value.cost,
      carId: value.carId,
      date: value.date,
    });

    spending.save((err, car) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!spending) {
        res.status(500).send({ message: 'Could not create spending' });
        return;
      }
      res.status(200).json(car);
    })
  }

  public static updateSpending(req: Request, res: Response) {
    const { error, value } = validateUpdateSpending(req.body);
    if (error) {
      res.status(400).send({ message: error });
      return;
    }

    SpendingModel.findOneAndUpdate(value._id, value).exec();
    res.sendStatus(200);
  }

  public static deleteSpending(req: Request, res: Response) {
    const { carId } = req.params;

    SpendingModel.findOneAndDelete({carId}, function (err) {
      if (err) {
          res.status(404).send({ message: 'Could not find spending' });
          return;
      }
      else {
        res.sendStatus(200);
      }
    });
  }
}