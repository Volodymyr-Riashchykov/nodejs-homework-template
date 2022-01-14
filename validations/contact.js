const Joi = require('joi');

const postSchema = Joi.object({
    name: Joi.string()
        .min(1)
        .max(20)
        .required(),
    email: Joi.string()
        .required(),
    phone: Joi.string()
        .required(),
    favorite: Joi.bool(),
    // .required()
});

const patchSchema = Joi.object({
    favorite: Joi.bool()
    .required()
});

const validation = (schema)=> {
    const validationMiddleware = (req, _, next)=> {
        const {error} = schema.validate(req.body);
        if(error){
            error.status = 400;
            next(error);
        }
        next();
    }

    return validationMiddleware;
}

module.exports = {
    postSchema,
    patchSchema,
    validation,
}