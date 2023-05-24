const mongoose = require('mongoose');
const {ProductSupplyStatus} = require('../utils/constants');
class ProductSupplyRepository{
    constructor({ProductSupplySchema}){
        this.ProductSupply= mongoose.model('ProductSupply',ProductSupplySchema);
        
    }
    async createProductSupply(product,toWarehouse,fromWarehouse,quantity,preferredSupplyDate){
        try {
            
            const newProductSupply = await this.ProductSupply({
                product: product,
                quantity: quantity,
                preferredSupplyDate:preferredSupplyDate,
                toWarehouse: toWarehouse,
                fromWarehouse : fromWarehouse,
                status: ProductSupplyStatus.CREATED,
            })
            await newProductSupply.save();
            return newProductSupply;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getProductSupplyById(productSupplyId){
        try {
            const productSupply = await this.ProductSupply.findById(productSupplyId.toString());
            return productSupply;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getAllProductSupplies (){
        try {
            const productSupplies = await this.ProductSupply.find();
            return productSupplies;
        } catch (error) {
            throw new Error(error);
        }
    }
    async approveProductSupply(productSupply){
        //productId,quantity,preferredSupplyDate,toWarehouseId,fromWarehouseId
        try {
            const productSupplyToUpdate  = await this.ProductSupply.findById(productSupply._id);
            productSupplyToUpdate.status = ProductSupplyStatus.APPROVED;
            await productSupplyToUpdate.save();
            return productSupplyToUpdate;
        } catch (error) {
            throw new Error(error);
        }
    }
    async rejectProductSupply(productSupply){
        try {
            const productSupplyToUpdate = await this.ProductSupply.findById(productSupply._id);
            productSupplyToUpdate.status = ProductSupplyStatus.REJECTED;
            await productSupplyToUpdate.save();
            return productSupplyToUpdate;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = ProductSupplyRepository;
