const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    quantity:{type:Number,default:1},
    price:{type:Number,required:true}
});
const Product = mongoose.model('Product', productSchema);
module.exports = {Product,productSchema};