import { AuthController } from './controllers/authController';
import { Router } from 'express';
import auth from './middleware/auth';

const router = Router();

router.post('/login', AuthController.login);

router.post('/register', AuthController.register);

router.post('/test', auth, AuthController.test);

export { router };
