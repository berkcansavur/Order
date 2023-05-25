const mongoose = require('mongoose');
class ProductRepository{
    constructor({ProductSchema}){
        this.Product = mongoose.model('Product',ProductSchema);
    }
    async registerProduct(product){
        try {
            const newProduct = await this.Product({
                ...product
            })
            await newProduct.save();
            return newProduct;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getProductNameById(id){
        try {
            const product = await this.Product.findById(id);
            const productName = product.name;
            return productName;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = ProductRepository;