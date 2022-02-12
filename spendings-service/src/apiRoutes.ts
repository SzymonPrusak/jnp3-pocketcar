import { SpendingsController } from "./controllers/spendingsController";
import { Router } from "express";
import auth from "./middleware/auth";


const router = Router();

router.get('/:carId', auth, SpendingsController.getSpendings);

router.post('/:carId', auth, SpendingsController.addSpending);

router.put('/:carId', auth, SpendingsController.updateSpending);

router.delete('/:carId', auth, SpendingsController.deleteSpending);

export { router };
