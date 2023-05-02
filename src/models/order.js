const mongoose = require('mongoose');
const {Status} = require('../utils/constants');
const orderSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.Object,
        required: true,
        ref:'User'
    },
    courier:{
        type: mongoose.Schema.Types.Object,
        ref:'Courier',
        default:'Order has not been assigned to any courier yet.'
    },
    status:{
        type: String,
        enum: Object.values(Status),
        default: Status.CREATED
    }

},{
    timestamps:true
})
const Order = mongoose.model('Order', orderSchema)
module.exports= Order; 