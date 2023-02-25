import express from 'express';
import authController from '../controllers/authController.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.post('/register',validate('register'), authController.register);

router.post('/login',validate('login'), authController.login);

export default router;