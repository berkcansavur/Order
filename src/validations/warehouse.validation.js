const {Joi} = require('celebrate');
const validateCreateWarehouseSchema= Joi.object({
    name:Joi.string().required(),
    location:Joi.string().required(),
    products:Joi.array().items(Joi.object({
        product:Joi.object({
            productId:Joi.string(),
            productQuantity:Joi.number()
        })
    })),
    couriers:Joi.array().items(Joi.object({
        courier:Joi.object(),
    }))
})
const validateDeleteWarehouseSchema = Joi.object({
    warehouseId:Joi.string().required(),
});
module.exports = validateCreateWarehouseSchema,validateDeleteWarehouseSchema;