const mongoose = require('mongoose');
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
    status:{
        type:String,
        required:true,
        default:'Pending'
    }
},{
    timestamps:true
})
const Order = mongoose.model('Order', orderSchema)
module.exports= Order; 