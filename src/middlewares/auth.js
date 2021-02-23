import { verify } from 'jsonwebtoken';
import { config } from  'dotenv';

config();

const secretKey = process.env.SECRET_KEY;

/**
 * @description This check authentication
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {func} next - Foward request to the next middleware function
 */
const auth = (req, res, next) => {
    try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'Access Dinied, please login'})

    const verifiedToken = verify(token, secretKey)
    req.user = verifiedToken;
         
    return next();
    } catch (error) {
        return res.status(403).json({ msg: 'Unauthorized'})
    }
};

export default auth;