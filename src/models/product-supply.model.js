const mongoose = require('mongoose');
const {ProductSupplyStatus} = require('../utils/constants');
const productSupplySchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.Object,
        ref:'Product',
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
        type:mongoose.Schema.Types.Object,
        ref:'Warehouse',
        required:true
    },
    fromWarehouseId:{
        type:mongoose.Schema.Types.Object,
        ref:'Warehouse',
        required:true
    },
    status:{
        type: String,
        enum: Object.values(ProductSupplyStatus),
        default: ProductSupplyStatus.CREATED
    }
})
const ProductSupply = mongoose.model('ProductSupply',productSupplySchema);
module.exports = {ProductSupply,productSupplySchema};