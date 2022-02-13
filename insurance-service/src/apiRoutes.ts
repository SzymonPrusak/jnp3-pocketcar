import { InsuranceController } from './controllers/insuranceController';
import { Router } from 'express';
import auth from './middleware/auth';

const router = Router();

router.get('/:carId', auth, InsuranceController.getInsurance);

router.post('/:carId', auth, InsuranceController.addInsurance);

router.put('/:carId', auth, InsuranceController.updateInsurance);

router.delete('/:carId', auth, InsuranceController.deleteInsurance);

export { router };
