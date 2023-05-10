const { Joi } = require('celebrate');

const validateCreateUserSchema= Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required()
})
module.exports = validateCreateUserSchema;