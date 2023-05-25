const {Joi} = require('celebrate');
const {ProductSupplyStatus} = require('../utils/constants');
const validateCreateProductSupplySchema = Joi.object({
    product:Joi.object(),
    quantity: Joi.number().required(),
    preferredSupplyDate: Joi.date().required(),
    toWarehouseId: Joi.object().required(),
    fromWarehouseId: Joi.object().required(),
    status: Joi.string().valid(...Object.values(ProductSupplyStatus)).default(ProductSupplyStatus.CREATED),
  });
const validateDeleteProductSupplySchema = Joi.object({
  _id:Joi.object().required()
});
module.exports = validateCreateProductSupplySchema,validateDeleteProductSupplySchema;