import { CarController } from "./controllers/carController";
import { Router } from "express";
import auth from "./middleware/auth";


const router = Router();

router.get('/', auth, CarController.listCars);

router.post('/', auth, CarController.addCar);

router.put('/', auth, CarController.updateCar);

router.delete('/:carId', auth, CarController.deleteCar);

export { router };
