const {Joi} = require('celebrate');
const validateProductSchema = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number(),
    price: Joi.number().required(),
})
module.exports = validateProductSchema;