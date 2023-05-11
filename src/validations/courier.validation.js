const {Joi} = require('celebrate');

const validateCreateCourierSchema = Joi.object({
    courierName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.number(),
})
module.exports = validateCreateCourierSchema;