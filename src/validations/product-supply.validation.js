const {Joi} = require('celebrate');
const {ProductSupplyStatus} = require('../utils/constants');
const validateProductSupplySchema = Joi.object({
    product:Joi.object(),
    quantity: Joi.number().required(),
    preferredSupplyDate: Joi.date().required(),
    toWarehouseId: Joi.object().required(),
    fromWarehouseId: Joi.object().required(),
    status: Joi.string().valid(...Object.values(ProductSupplyStatus)).default(ProductSupplyStatus.CREATED),
  });
  
module.exports = validateProductSupplySchema;