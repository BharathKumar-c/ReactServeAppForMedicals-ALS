import express, { Router } from 'express';
import { AuthController, OTPController } from '../../../controllers';

const router: Router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/refreshToken', AuthController.refreshToken);

router.post('/emailAlreadyExists', AuthController.emailAlreadyExists);
router.post('/phoneAlreadyExists', AuthController.phoneAlreadyExists);
router.post('/sendOtp', OTPController.sendOtp);
router.post('/verifyOtp', OTPController.verifyOtp);

export default router;
