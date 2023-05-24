const { Joi } = require('celebrate');

const validateCreateUserSchema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required(),
    age:Joi.number(),
})
const validateLoginUserSchema = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required(),
});
const validateUpdateUserSchema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required(),
    age:Joi.number(),
})
const validateDeleteUserSchema = Joi.object({});
const validateGetUserSchema = Joi.object({});
module.exports = validateCreateUserSchema,validateLoginUserSchema,validateUpdateUserSchema,validateDeleteUserSchema,validateGetUserSchema;