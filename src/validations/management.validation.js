const {Joi}= require('celebrate');
const validateManagementSchema = Joi.object({
    managerName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    warehouses:Joi.array().items(Joi.object({
        warehouseId: Joi.string(),
    })),
    product_supplies:Joi.array().items(Joi.object({
        product_supply_id: Joi.string(),
    })),
    courier_supplies:Joi.array().items(Joi.object({
        courier_supply_id: Joi.string(),
    })),
    products:Joi.array().items(Joi.object({
        productId: Joi.string(),
    })),
    couriers:Joi.array().items(Joi.object({
        courierId: Joi.string(),
    }))
});
module.exports = validateManagementSchema;