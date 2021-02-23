import { compare } from "bcryptjs";
import generateToken from "../helpers/genToken";
import hashedPass from "../helpers/hashPass";
import models from "../models";

const { User } = models

export default {
    /**
     * @description This allow user to signup
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} Response object
     */
    signup: async (req, res) => {
        try {          
            const { firstName, lastName, email, password } = req.body;
            const userExist = await User.findOne({ where: { email } })
    
            if (userExist) return res.status(400).json({ msg: 'User registered before'});
            
            const hashedPassword = await hashedPass(password)
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword
            })
            const { createdAt, updatedAt } = newUser;

            const token  = await generateToken({ id: newUser.id, firstName, lastName, email})

            return res.status(201).json({ 
                msg: 'User registered successfully',  
                savedUser: { firstName, lastName, email, createdAt, updatedAt },
                token 
            })
        } catch (error) {
            return res.status(500).json({ msg: 'Internal server error'})
        }
    },
    
    /**
     * @description This allow user to login
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} Response object
     */
    login: async (req, res) => {
        const { email, password } = req.body;
         const account = await User.findOne({ where: { email }});
        if (!account) return res.status(400).json({ msg: 'Invalid email or password'});
        try {
            const foundUser = await compare(password, account.password);
            if (!foundUser) return res.status(400).json({ msg: 'Invalid email or password'});

            const { firstName, lastName} = account;
            const token = await generateToken({
                id: account.id,
                firstName,
                lastName,
                email
            })
            return res.status(200).json({
                msg: 'Logged in successfully',
                body: { firstName, lastName, email },
                token
            })
            
        } catch (error) {
            return res.status(500).json({ msg: 'Internal server error'})
        }
    }
}