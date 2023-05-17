const mongoose = require('mongoose');
const {ProductSupplyStatus} = require('../utils/constants');
class ProductSupplyRepository{
    constructor({ProductSupplySchema,WarehouseRepository,ProductRepository,}){
        this.ProductSupply= mongoose.model('ProductSupply',ProductSupplySchema);
        this.WarehouseRepository = WarehouseRepository;
        this.ProductRepository = ProductRepository;
        this.createProductSupply = this.createProductSupply.bind(this);
        this.getProductSupplyById = this.getProductSupplyById.bind(this);
        this.getAllProductSupplies = this.getAllProductSupplies.bind(this);
        this.approveProductSupply = this.approveProductSupply.bind(this);
        this.rejectProductSupply =this.rejectProductSupply.bind(this);
    }
    async createProductSupply(productSupplyRequest){
        try {
            const product = await this.ProductRepository.findById(productSupplyRequest.productId.toString());
            const toWarehouse = await this.WarehouseRepository.getWarehouseById(productSupplyRequest.toWarehouseId.toString());
            const fromWarehouse = await this.WarehouseRepository.getWarehouseById(productSupplyRequest.fromWarehouseId.toString());
            const quantity =productSupplyRequest.quantity;
            const preferredSupplyDate = productSupplyRequest.preferredSupplyDate;
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
