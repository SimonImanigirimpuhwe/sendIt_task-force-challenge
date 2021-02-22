import { hash, genSalt } from 'bcryptjs';
import { async } from 'regenerator-runtime';

const hashedPass = async (password) => {
    const salt = await genSalt(10)
    const hashedPswd = await hash(password, salt)
    return hashedPswd
};

export default hashedPass;