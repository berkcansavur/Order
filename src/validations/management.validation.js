const {Joi}= require('celebrate');
const validateCreateManagementSchema = Joi.object({
    managerName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    warehouses:Joi.array().items(Joi.object({
        warehouse: Joi.object(),
    })),
    warehouseManagers: Joi.array().items(Joi.object({
        warehouseManager:Joi.object(),
    })),
    product_supplies: Joi.array().items(Joi.object({
        product_supply: Joi.object(),
    })),
    courier_supplies:Joi.array().items(Joi.object({
        courier_supply: Joi.object(),
    })),
    products:Joi.array().items(Joi.object({
        product: Joi.object(),
    })),
    couriers:Joi.array().items(Joi.object({
        courier: Joi.object(),
    }))
});
const validateLoginManagerSchema= Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});
const validateCreateManagerSchema = Joi.object({
    managerName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});
module.exports = validateCreateManagementSchema,validateCreateManagerSchema,validateLoginManagerSchema;