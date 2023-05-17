const {Joi} = require('celebrate');
const validateRegisterProductSchema = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number(),
    price: Joi.number(),
});
module.exports = validateRegisterProductSchema;