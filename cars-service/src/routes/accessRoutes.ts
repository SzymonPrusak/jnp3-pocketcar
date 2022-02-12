import { AccessController } from "../controllers/accessController";
import { Router } from "express";
import auth from "../middleware/auth";


const accessRouter = Router();

accessRouter.get('/:carId', auth, AccessController.listAccess);

accessRouter.post('/:carId', auth, AccessController.addAccess);

accessRouter.delete('/:accessId', auth, AccessController.deleteAccess);

export { accessRouter };