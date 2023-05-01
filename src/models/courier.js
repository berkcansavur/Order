const mongoose =require('mongoose');
const validator = require('validator');
const bcrypt =require('bcryptjs');
const courierSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email');
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Invalid password');
            }
        }
    },
    phone:{
        type:String,
        trim:true
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
courierSchema.virtual('orders',{
    ref:'Order',
    localField:'_id',
    foreignField:'courier'
})
courierSchema.methods.toJSON = function(){
    const courier = this
    const courierObject = courier.toObject()
    delete courierObject.password;
    delete courierObject.tokens;
    return courierObject;
}
courierSchema.pre('save',async function(next){
    const courier = this;
    if(courier.isModified('password')){
        courier.password = await bcrypt.hash(courier.password,8);
    }
    next();
});
const Courier = mongoose.model('Courier',courierSchema);
module.exports = Courier;