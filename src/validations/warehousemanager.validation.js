const {Joi} = require('celebrate');
const validateWarehouseManagerSchema = Joi.object({
        name:Joi.string().required(),
        email:Joi.string().required(),
        password:Joi.string().required(),
})
module.exports = validateWarehouseManagerSchema;