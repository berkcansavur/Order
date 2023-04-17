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
    },
    email:{
        type:String,
        uniqe:true,
        required:true,
        trim:true,
        lowcase:true,
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
const User = mongoose.model('User',userSchema);
module.exports={User}