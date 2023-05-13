const mongoose = require('mongoose');
const Joi = require('joi');
const {Status} = require('../utils/constants');
const orderSchema = new mongoose.Schema({
    customer: {
        _id : {type:String, required:true},
        name : {type:String, required:true},
        email: {type:String, required:true}
    },
    products: [{
        product:{
            type:mongoose.Schema.Types.Object,
            ref:'Product'
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
        products: Joi.array().items(
            Joi.object({
              product: Joi.object().required(),
            })
          ).required(),
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