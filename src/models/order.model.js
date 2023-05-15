const mongoose = require('mongoose');
const {OrderStatus} = require('../utils/constants');
const orderSchema = new mongoose.Schema({
    customer: {
        _id : {type:String, required:true},
        name : {type:String, required:true},
        email: {type:String, required:true}
    },
    products:[{
        product:{
            productId:{
                type:String
            },
            productQuantity:{
                type:Number
            }
        }
    }],
    courier:{
        type: mongoose.Schema.Types.Object,
        ref:'Courier',
    },
    status:{
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.CREATED
    },
    fromWarehouseId:{
        type: String,
        required:true
    }
},{
    timestamps:true
})
orderSchema.virtual('orderCourier',{
    ref: 'Courier',
    localField:'_id',
    foreignField:'order'
})
const Order = mongoose.model('Order', orderSchema);
module.exports = {Order,orderSchema}; 