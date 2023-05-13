const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const warehouseManagerSchema = new mongoose.Schema({
    name:{
        type:String,
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
        type:String,
        required:true,
        minlength:8,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password can not contain password');
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
});
warehouseManagerSchema.methods.toJSON = function(){
    const WarehouseManager = this;
    const WarehouseManagerObject = WarehouseManager.toObject();
    delete WarehouseManagerObject.password;
    delete WarehouseManagerObject.tokens;
    return WarehouseManagerObject;
}
warehouseManagerSchema.pre('save',async function(next){
    const WarehouseManager = this;
    if(WarehouseManager.isModified('password')){
        WarehouseManager.password = await bcrypt.hash(WarehouseManager.password,8);
    }
    next();
});
const WarehouseManager = mongoose.model('WarehouseManager',warehouseManagerSchema);

module.exports = { WarehouseManager,warehouseManagerSchema};