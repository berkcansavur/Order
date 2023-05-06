const mongoose = require('mongoose');
const Joi = require('joi');
const orderSchema = new mongoose.Schema({
    customerName: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    product: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    courier:{
        type : mongoose.Schema.Types.ObjectId,
        ref :'Courier'
    },
    status:{
        type:String,
        required:true,
        default:'Pending'
    }
},{
    timestamps:true
})
const Order = mongoose.model('Order', orderSchema);
function validateOrder(order){
    const schema = Joi.object({
        customerName: Joi.string().required(),
        product: Joi.string().required(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
        courier: Joi.string().required(),
        status: Joi.string().required()
    });
    return schema.validate(order);
}
module.exports= {Order, validateOrder}; 