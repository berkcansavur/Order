const { Joi } = require('celebrate');
const validateCreateOrderSchema = Joi.object({
    customer:Joi.object({
        _id:Joi.string(),
        name:Joi.string(),
        email:Joi.string(),
    }).required(),
    products:Joi.array().items(Joi.object({
      product:Joi.object({
          productId:Joi.string(),
          productQuantity:Joi.number()
      })
  })).required(),
    courier:Joi.object(),
    status:Joi.string(),
    fromWarehouseId:Joi.string().required(),
});
const validateDeleteOrderSchema = Joi.object({});
const validateUpdateOrderSchema = Joi.object({
    products:Joi.array().items(Joi.object({
        product:Joi.object({
            productId:Joi.string(),
            productQuantity:Joi.number()
        })
    })).required(),
});
const validateUpdateOrderStatusSchema = Joi.object({});
module.exports = validateCreateOrderSchema,validateDeleteOrderSchema,validateUpdateOrderSchema,validateUpdateOrderStatusSchema;