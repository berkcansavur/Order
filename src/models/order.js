const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    orderContent : {
        product: {
            type: String,
            required: true,
            trim: true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        }
    }
},{
    timestamps:true
})
const Order = mongoose.model('Order', orderSchema)
module.exports={Order}