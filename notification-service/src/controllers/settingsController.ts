import { Request, Response } from 'express';
import { NotificationChannelModel } from '../models/settingsModel';


export class SettingsController {
  public static readSettings(req: Request, res: Response) {
    const token = req.userToken;
    if (!token) {
      res.sendStatus(401);
      return;
    }

    NotificationChannelModel.find({ userId: token.id})
      .exec((err, channels) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.status(200).json(channels);
      })
  }

  public static createUpdateSettings(req: Request, res: Response) {
    const token = req.userToken;
    if (!token) {
      res.sendStatus(401);
      return;
    }
    
    req.body.forEach(ch => {
      const model = new NotificationChannelModel(ch);
      model.save();
    });
    res.sendStatus(200);
  }

  public static deleteSettings(req: Request, res: Response) {
    const token = req.userToken;
    if (!token) {
      res.sendStatus(401);
      return;
    }

    NotificationChannelModel.deleteMany({ userId: token.id }).exec();
    res.sendStatus(200);
  }
}