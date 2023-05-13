const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const managementSchema = mongoose.Schema({
    managerName:{
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
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    managers:{
        managerId:{type: String}
    },
    warehouses:[{
        warehouseId:{
            type:String
        }
    }],
    product_supplies:[{
        product_supply_id:{
            type:String
        }
    }],
    courier_supplies:[{
        courier_supply_id:{
            type:String
        }
    }],
    products:[{
        productId:{
            type:String
        }
    }],
    couriers:[{
        courierId:{
            type:String
        }
    }],
},{
    timestamps:true
});
managementSchema.methods.toJSON = function () {
    const manager = this
    const managerObject = manager.toObject()
    delete managerObject.password;
    delete managerObject.tokens;
    return managerObject
}
managementSchema.pre('save', async function(next) {
    const manager = this;
    if(manager.isModified('password')){
        manager.password = await bcrypt.hash(manager.password, 8);
    }
    next();
});
const Management = mongoose.model('Management',managementSchema);
module.exports={Management,managementSchema};

