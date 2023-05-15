const mongoose = require('mongoose');
const warehouseSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String, 
        required:true,
    },
    products:[{
        product:{
            productId:{
                type:String
            },
            productQuantity:{
                type:Number
            }
        }
    }],
    couriers:[{
        courierId:{
            type:String
        }
    }]
});
const Warehouse = mongoose.model('Warehouse',warehouseSchema);
module.exports = {Warehouse,warehouseSchema}