import { CarController } from "../controllers/carController";
import { Router } from "express";
import auth from "../middleware/auth";


const carRouter = Router();

carRouter.get('/', auth, CarController.listCars);

carRouter.post('/', auth, CarController.addCar);

carRouter.put('/', auth, CarController.updateCar);

carRouter.delete('/:carId', auth, CarController.deleteCar);

export { carRouter };
