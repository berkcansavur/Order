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
        productId:{
            type:String
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