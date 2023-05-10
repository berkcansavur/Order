const {Joi} = require('celebrate');

const validateCreateCourierSchema = Joi.object({
    courierNamecourierName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.number().required(),
})
module.exports = validateCreateCourierSchema;