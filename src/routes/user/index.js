import { Router } from 'express';
import authcontrollers from '../../controllers/user';
import { signupValidation, loginValidation } from '../../middlewares/validation';


const authRoutes = new Router();

authRoutes.post('/signup', signupValidation, authcontrollers.signup);
authRoutes.post('/login', loginValidation, authcontrollers.login)

export default authRoutes;