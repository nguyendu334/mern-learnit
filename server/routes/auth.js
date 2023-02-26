import express from 'express';
import authController from '../controllers/authController.js';
import validate from '../middleware/validate.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth.verifyToken, authController.checkLogin);

router.post('/register', validate('register'), authController.register);

router.post('/login', validate('login'), authController.login);

export default router;
