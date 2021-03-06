import {
  CarAccessModel,
  dropCacheAccesses,
  getAccesses,
} from '../model/carModel';
import { Request, Response } from 'express';

export class AccessController {
  public static async listAccess(req: Request, res: Response) {
    const token = req.userToken;
    if (!token) {
      res.sendStatus(401);
      return;
    }

    const { carId } = req.params;
    const { userOnly } = req.query;
    if (!carId) {
      res.sendStatus(400);
      return;
    }

    const accesses = await getAccesses(carId);
    const userAccess = accesses.find((a) => a.userId == token.id);
    if (!userAccess) {
      res.sendStatus(403);
      return;
    }

    if (userAccess.role == 'owner' && !userOnly) {
      res.status(200).json(accesses);
    } else {
      res.status(200).json([userAccess]);
    }
  }

  public static async addAccess(req: Request, res: Response) {
    const token = req.userToken;
    if (!token) {
      res.sendStatus(401);
      return;
    }

    const { carId } = req.params;
    const { userId, role } = req.body;
    if (!carId || !userId || !role || (role != 'viewer' && role != 'editor')) {
      res.sendStatus(400);
      return;
    }

    const accesses = await getAccesses(carId);
    const userAccess = accesses.find((a) => a.userId == token.id);
    if (!userAccess || userAccess.role != 'owner') {
      res.sendStatus(403);
      return;
    }

    if (accesses.find((a) => a.userId == userId)) {
      res.sendStatus(400);
      return;
    }

    await dropCacheAccesses(carId);
    const access = new CarAccessModel({
      car: carId,
      userId,
      role,
    });
    access.save();

    res.status(200).json(access);
  }

  public static deleteAccess(req: Request, res: Response) {
    const token = req.userToken;
    if (!token) {
      res.sendStatus(401);
      return;
    }

    const { accessId } = req.params;
    if (!accessId) {
      res.sendStatus(400);
      return;
    }

    CarAccessModel.findById(accessId).exec((err, access) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }

      if (!access) {
        res.sendStatus(404);
        return;
      }

      CarAccessModel.find({ car: access.car }).exec((err, accesses) => {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }

        const carOwner = accesses.find((a) => a.role == 'owner');
        if (carOwner.userId != token.id) {
          res.sendStatus(403);
          return;
        }

        if (access.userId == carOwner.userId) {
          res.sendStatus(400);
          return;
        }

        dropCacheAccesses(access.car.toString()).then(() => {
          access.delete();
          res.sendStatus(200);
        });
      });
    });
  }
}
