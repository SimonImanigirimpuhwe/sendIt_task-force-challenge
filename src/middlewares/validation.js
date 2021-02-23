import Joi from '@hapi/joi';

/**
 * @description This validate req.body before signing up
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {next} next - Foward request to the next middleware function
 */
export const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().required().messages({
            'sting.base': 'FirstName is required',
            'string.empty': 'FirstName is required'
        }),
        lastName: Joi.string().required().messages({
            'sting.base': 'LastName is required',
            'string.empty': 'LastName is required'
        }),
        email: Joi.string().email().lowercase().required().messages({
            'string.empty': 'Email is required!',
            'string.lowercase': 'Email must be lowercase!',
            'string.email': 'Email must be valid!'
        }),
        password: Joi.string().required().min(6).max(150).messages({
            'string.empty': 'Password is required!',
            'string.min': `Password must be at least {#limit} characters`,
            'string.max': `Password must be less than {#limit} characters`,
            'string.email': 'Password must be valid!'
        })
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    return next();
};

/**
 * @description This validate req.body before login
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {next} next - Foward request to the next middleware function
 */
export const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().lowercase().required().messages({
            'string.empty': 'Email is required!',
            'string.lowercase': 'Email must be lowercase!',
            'string.email': 'Email must be valid!'
        }),
        password: Joi.string().required().min(6).max(150).messages({
            'string.empty': 'Password is required!',
            'string.min': `Password must be at least {#limit} characters`,
            'string.max': `Password must be less than {#limit} characters`,
            'string.email': 'Password must be valid!'
        })
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    return next();
};

/**
 * @description This validate req body before creating new To-Do
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {next} next - Foward request to the next middleware function
 */
export const createTodoValidation = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required().messages({'string.empty': 'Title is required!'}),
        description: Joi.string().required().messages({'string.empty': 'Description is required!'}),
        priority: Joi.string().required().valid('LOW', 'MEDIUM', 'HIGH').messages({
            'string.empty': 'Priority is required',
        })
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    return next();
};

/**
 * @description This validate request body while updating To-Do
 * @param {object} req - Request object
 * @param {object} res - Resonse object
 * @param {func} next - Foward request to the next middleware function
 */
export const updateTodoValidation = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().messages({'string.empty': 'Title cannot be empty!'}),
        descritption: Joi.string().messages({'string.empty': 'Description cannot be empty!'}),
        priority: Joi.string().uppercase().messages({
            'string.empty': 'Priority cannot be empty',
            'string.uppercase': 'Priority must be uppercase',
            'string.any': 'Priority cannot be empty'
        })
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    return next();
};