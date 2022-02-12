import { InsurenceController } from "./controllers/insuranceController";
import { Router } from "express";
import auth from "./middleware/auth";


const router = Router();

router.get('/:carId', auth, InsurenceController.getInsurance);

router.post('/:carId', auth, InsurenceController.addInsurence);

router.put('/:carId', auth, InsurenceController.updateInsurence);

router.delete('/:carId', auth, InsurenceController.deleteInsurence);

export { router };
