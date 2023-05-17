const {Joi} = require('celebrate');

const validateCreateCourierSchema = Joi.object({
    courierName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    age:Joi.number(),
    phone: Joi.number(),
    warehouse: Joi.object(),
    orders:Joi.array().items(Joi.object({
        order:Joi.object()
    }))
})
module.exports = validateCreateCourierSchema;