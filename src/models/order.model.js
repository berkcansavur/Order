const mongoose = require('mongoose');
const Joi = require('joi');
const {Status} = require('../utils/constants');
const orderSchema = new mongoose.Schema({
    customer: {
        _id : {type:String, required:true},
        name : {type:String, required:true},
        email: {type:String, required:true}
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
        default: 0,
    },
    courier:{
        _id : {type:String},
        name : {type:String},
        email: {type:String},
        phone: {type:Number}
    },
    status:{
        type: String,
        enum: Object.values(Status),
        default: Status.CREATED
    }
},{
    timestamps:true
})
const Order = mongoose.model('Order', orderSchema);
function validateOrder(order){
    const schema = Joi.object({
        customer:Joi.object({
            _id:Joi.string(),
            name:Joi.string(),
            email:Joi.string(),
        }).required(),
        product:Joi.string().required(),
        quantity:Joi.number().required(),
        price:Joi.number(),
        courier:Joi.object({
            _id:Joi.string(),
            name:Joi.string(),
            email:Joi.string(),
            phone:Joi.number(),
        })
    });
    return schema.validate(order);
}
module.exports = {Order, validateOrder,orderSchema}; 