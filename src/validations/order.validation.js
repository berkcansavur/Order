const { Joi } =require('celebrate');
const validateOrderSchema = Joi.object({
    customer:Joi.object({
        _id:Joi.string(),
        name:Joi.string(),
        email:Joi.string(),
    }).required(),
    products: Joi.array().items(
        Joi.object({
          product: Joi.object({
            productName: Joi.string().required(),
            quantity: Joi.number().required(),
            price: Joi.number(),
          }).required(),
        })
      ).required(),
    courier:Joi.object({
        _id:Joi.string(),
        name:Joi.string(),
        email:Joi.string(),
        phone:Joi.number(),
    })
});
module.exports = validateOrderSchema;