import { Request, Response } from 'express';
import { SpendingModel } from '../model/spendingModel';
import { validateAddSpending, validateUpdateSpending } from '../utils/spendingSchema';
import axios from 'axios'

async function getAcces(carId: string, isIntegration: boolean) {
  try {
    const response = await axios.get('access/' + carId + '?userOnly=true')
    if(isIntegration) {
      return response.data.role !== 'viewer' && response.status === 200;
    }
    return response.status === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export class SpendingsController {
  public static getSpendings(req: Request, res: Response) {
    const { carId } = req.params;

    if(!getAcces(carId, false)) {
      return res.status(403).send({ message: "You don not have permission" });
    }

    SpendingModel.find({carId}, (err, results) => {
      if(err) {
        return res.status(500).send({ message: err });
      }
      return res.status(200).json(results);
    });
  }

  public static addSpending(req: Request, res: Response) {
    const { error, value } = validateAddSpending(req.body);
    const { carId } = req.params;

    if(!getAcces(carId, true)) {
      res.status(403).send({ message: "You don not have permission" });
      return;
    }

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
    const { carId } = req.params;
    if(!getAcces(carId, true)) {
      res.status(403).send({ message: "You don not have permission" });
      return;
    }

    if (error) {
      res.status(400).send({ message: error });
      return;
    }

    SpendingModel.findOneAndUpdate(value._id, value).exec();
    res.sendStatus(200);
  }

  public static deleteSpending(req: Request, res: Response) {
    const { carId } = req.params;

    if(!getAcces(carId, true)) {
      res.status(403).send({ message: "You don not have permission" });
      return;
    }

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