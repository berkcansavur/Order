const {Joi} = require('celebrate');
const validateWarehouseSchema= Joi.object({
    name:Joi.string().required(),
    location:Joi.string().required(),
    products:Joi.array().items(Joi.object({
        product:Joi.object({
            productId:Joi.string(),
            productQuantity:Joi.number()
        })
    })),
    couriers:Joi.array().items(Joi.object({
        courierId:Joi.string(),
    }))
})