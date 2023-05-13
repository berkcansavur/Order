const mongoose = require('mongoose');
const managementSchema = mongoose.Schema({
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
});
const Management = mongoose.model('Management',managementSchema);
module.exports={Management,managementSchema};

