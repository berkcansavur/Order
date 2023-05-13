const mongoose = require('mongoose');
const Joi = require('joi');
const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    quantity:{type:Number,default:1},
    price:{type:Number,required:true}
});
productSchema.virtual('orders',{
    ref:'Order',
    localField:'_id',
    foreignField:'product'
})
const Product = mongoose.model('Product', productSchema);
function validateProduct(product){
    const schema =Joi.object({
        name:Joi.string().required(),
        quantity: Joi.number(),
        price: Joi.number().required()
    })
    return schema.validate(product);
}
module.exports = {Product,validateProduct,productSchema};