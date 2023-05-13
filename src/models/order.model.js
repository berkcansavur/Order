const mongoose = require('mongoose');
const {OrderStatus} = require('../utils/constants');
const orderSchema = new mongoose.Schema({
    customer: {
        _id : {type:String, required:true},
        name : {type:String, required:true},
        email: {type:String, required:true}
    },
    products: [{
        productId:{
            type:String,
            required:true
        }
    }],
    courier:{
        _id : {type:String},
        name : {type:String},
        email: {type:String},
        phone: {type:Number}
    },
    status:{
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.CREATED
    }
},{
    timestamps:true
})
const Order = mongoose.model('Order', orderSchema);
module.exports = {Order,orderSchema}; 