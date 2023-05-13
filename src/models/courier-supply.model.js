const mongoose = require('mongoose');
const {CourierSupplyStatus} = require('../utils/constants');
const courierSupplySchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    preferredSupplyDate:{
        type:Date,
        required:true
    },
    toWarehouseId:{
        type:String,
        required:true
    },
    fromWarehouseId:{
        type:String,
        required:true
    },
    status:{
        type: String,
        enum: Object.values(CourierSupplyStatus),
        default: CourierSupplyStatus.CREATED
    }
})

const CourierSupply = mongoose.model('ProductSupply',productSupplySchema);
module.exports = {CourierSupply,courierSupplySchema};