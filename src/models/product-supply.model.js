const mongoose = require('mongoose');
const {ProductSupplyStatus} = require('../utils/constants');
const productSupplySchema = new mongoose.Schema({
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
        enum: Object.values(ProductSupplyStatus),
        default: ProductSupplyStatus.CREATED
    }
})
const ProductSupply = mongoose.model('ProductSupply',productSupplySchema);
module.exports = {ProductSupply,productSupplySchema};