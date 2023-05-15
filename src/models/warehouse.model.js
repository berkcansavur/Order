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
        courier:{
            type:mongoose.Schema.Types.Object,
            ref:'Courier'
        }
    }],
    warehouseManager:{
        type:mongoose.Schema.Types.Object,
        ref:'WarehouseManager'
    }
});
warehouseSchema.virtual('warehouse',{
    ref:'WarehouseManager',
    localField:'_id',
    foreignField:'warehouse'
})
warehouseSchema.virtual('warehouseCourier',{
    ref:'Courier',
    localField:'_id',
    foreignField:'courier'
})
const Warehouse = mongoose.model('Warehouse',warehouseSchema);
module.exports = {Warehouse,warehouseSchema}