const Joi = require('joi');

module.exports = {
    postMiddleware: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
                .min(1)
                .max(20)
                .required(),
            email: Joi.string()
                .required(),
            phone: Joi.string()
                .required(),
        })
        const result = schema.validate(req.body);
        if (result.error) {
            return res.status(400).json({status:result.error.details})
        }
        next();
    },
}