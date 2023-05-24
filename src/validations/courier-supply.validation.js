const {Joi} = require('celebrate');
const {CourierSupplyStatus} = require('../utils/constants');
const validateCreateCourierSupplySchema = Joi.object({
    courier:Joi.object(),
    preferredSupplyDate: Joi.date().required(),
    toWarehouseId: Joi.object().required(),
    fromWarehouseId: Joi.object().required(),
    status: Joi.string().valid(...Object.values(CourierSupplyStatus)).default(CourierSupplyStatus.CREATED),
})
module.exports= validateCreateCourierSupplySchema