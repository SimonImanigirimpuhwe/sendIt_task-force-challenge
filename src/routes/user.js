import { Router } from 'express';
import authcontrollers from '../controllers/user';
import { signupValidation, loginValidation } from '../middlewares/validation';


const authRoutes = new Router();

/**
 * @swagger
 * /users/signup:
 *     post:
 *      summary: User can signup
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/signup'
 *      responses:
 *        "201":
 *          description: User registered successfully
 *        "400":
 *          description: Bad request
 *        "500":
 *          description: Internal server error
 *
 * components:
 *    schemas:
 *      signup:
 *        type: object
 *        required:
 *          - firstName
 *          - lastName
 *          - email
 *          - password
 *        properties:
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 */
authRoutes.post('/signup', signupValidation, authcontrollers.signup);

/**
 * @swagger
 * /users/login:
 *     post:
 *      summary: User can login
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/login'
 *      responses:
 *        "200":
 *          description: Logged in successfully
 *        "400":
 *          description: Bad request
 *        "500":
 *          description: Internal server error
 *
 * components:
 *    schemas:
 *      login:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 */
authRoutes.post('/login', loginValidation, authcontrollers.login)

export default authRoutes;