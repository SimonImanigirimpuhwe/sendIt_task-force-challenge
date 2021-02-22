import { hash, genSalt } from 'bcryptjs';

const hashedPass = async (password) => {
    const salt = await genSalt(10)
    const hashedPswd = await hash(password, salt)
    return hashedPswd
};

export default hashedPass;