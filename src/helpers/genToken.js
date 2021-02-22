import { sign } from "jsonwebtoken";
import { config } from  'dotenv';

config();

const secretKey = process.env.SECRET_KEY;

const generateToken = (data) => {
    const token = sign(data, secretKey, { expiresIn: '10h'});
    return token;
};

export default generateToken;