const mongoose = require('mongoose');
const {CourierSupplyStatus} = require('../utils/constants');
const courierSupplySchema = new mongoose.Schema({
    courier:{
        type:mongoose.Schema.Types.Object,
        required:true
    },
    preferredSupplyDate:{
        type:Date,
        required:true
    },
    toWarehouse:{
        type:mongoose.Schema.Types.Object,
        required:true
    },
    fromWarehouse:{
        type:mongoose.Schema.Types.Object,
        required:true
    },
    status:{
        type: String,
        enum: Object.values(CourierSupplyStatus),
        default: CourierSupplyStatus.CREATED
    }
})

const CourierSupply = mongoose.model('CourierSupply',courierSupplySchema);
module.exports = {CourierSupply,courierSupplySchema};