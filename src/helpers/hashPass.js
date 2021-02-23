import { hash, genSalt } from 'bcryptjs';

/**
 * @description This hash password so that it cannot be stored as plain text
 * @param {string} password 
 * @returns {string} A hashed password
 */
const hashedPass = async (password) => {
    const salt = await genSalt(10)
    const hashedPswd = await hash(password, salt)
    return hashedPswd
};

export default hashedPass;