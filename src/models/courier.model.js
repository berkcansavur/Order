const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const courierSchema = new mongoose.Schema({
    courierName:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid');
            }
        }
    },
    password:{
        type: String,
        required:true,
        minlength: 8,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
               throw new Error('Password can not contain "password"') 
            }
        }
    },
    age: {
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age can not be negative')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})
userSchema.virtual('orders',{
    ref:'Order',
    localField:'_id',
    foreignField:'courier'
})
const Courier = mongoose.model('Courier',courierSchema);
function validateCourier(courier){
    const schema = Joi.object({
        courierName: Joi.string().required(),
        email:Joi.string().required().email(),
        password:Joi.string().required().min(8),
        age:Joi.number().default(0)

    });
    return schema.validate(courier);
}
module.exports = {Courier,validateCourier}