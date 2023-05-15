const { Joi } = require('celebrate');

const validateUserSchema= Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required(),
    age:Joi.number(),
})
module.exports = validateUserSchema;