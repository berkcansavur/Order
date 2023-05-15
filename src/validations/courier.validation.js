const {Joi} = require('celebrate');

const validateCourierSchema = Joi.object({
    courierName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    age:Joi.number(),
    phone: Joi.number(),
    wareHouse: Joi.object(),
})
module.exports = validateCourierSchema;