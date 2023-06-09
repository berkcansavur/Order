const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name:{
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
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password;
    delete userObject.tokens;
    return userObject
}
// Hash the plain text password before saving.
userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});
const User = mongoose.model('User',userSchema);
module.exports = {User,userSchema};