import { Request, Response } from 'express';
import { InsuranceModel } from '../model/insuranceModel';
import { validateAddInsurance, validateUpdateInsurance } from '../utils/insuranceSchema';

export class InsurenceController {
  public static getInsurance(req: Request, res: Response) {
    const { carId } = req.params;

    InsuranceModel.findOne({ carId })
      .populate({
        path: 'insurance',
        model: 'Insurance',
      })
      .exec((err, insurance) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        return res.status(200).json(insurance);
      });
  }

  public static addInsurance(req: Request, res: Response) {
    const { error, value } = validateAddInsurance(req.body);
    if (error) {
      res.status(400).send({ message: error });
      return;
    }

    const insurance = new InsuranceModel({
      insuranceNumber: value.insuranceNumber,
      cost: value.cost,
      company: value.company,
      scope: value.scope,
      contactNumber: value.contractNumber,
      validFrom: value.validFrom,
      validUntil: value.validUntil
    });
    
    insurance.save((err, car) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!insurance) {
        res.status(500).send({ message: 'Could not create insurance' });
        return;
      }
      res.status(200).json(car);
    })
  }

  public static updateInsurence(req: Request, res: Response) {
    const { error, value } = validateUpdateInsurance(req.body);
    if (error) {
      res.status(400).send({ message: error });
      return;
    }

    InsuranceModel.findOneAndUpdate(value._id, value).exec();
    res.sendStatus(200);
  }

  public static deleteInsurence(req: Request, res: Response) {
    const { carId } = req.params;
    
    InsuranceModel.findOneAndDelete({carId}, function (err) {
      if (err) {
          res.status(404).send({ message: 'Could not find insurance' });
          return;
      }
      else {
        res.sendStatus(200);
      }
    });
  }
}
