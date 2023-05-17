const {Joi} = require('celebrate');
const validateCreateWarehouseManagerSchema = Joi.object({
        name:Joi.string().required(),
        email:Joi.string().required(),
        password:Joi.string().required(),
        warehouse:Joi.object()
})
module.exports = validateCreateWarehouseManagerSchema;