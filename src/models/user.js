const validator = require('validator');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required: true
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
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowCase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid');
            }
        }
    },
    age: {
        type:Number,
        default:0,
    },

},{
    timestamps:true
})
userSchema.virtual('orders',{
    ref:'Order',
    localField:'_id',
    foreignField:'user'
})
userSchema.methods.toJSON = function (){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    return userObject
}
const User = mongoose.model('User',userSchema);
module.exports=User