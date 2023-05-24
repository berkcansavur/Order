const mongoose = require('mongoose');
class WarehouseRepository{
    constructor({WarehouseSchema,ProductRepository}){
        this.Warehouse = mongoose.model('Warehouse',WarehouseSchema);
        this.ProductRepository = ProductRepository;
    }   
    async addWarehouse(warehouse){
        try {
            const newWarehouse = await this.Warehouse({
                ...warehouse
            });
            await newWarehouse.save();
            return newWarehouse;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getWarehouseById(id){
        try {
            const warehouse = await this.Warehouse.findById(id.toString());
            return warehouse;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getWarehousesProductsById(id){
        try {
            const warehouse = await this.getWarehouseById(id.toString());
            const productsArray = warehouse.products;
            return productsArray ;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getWarehousesSelectedProductById(warehouseId, productId){
        try {
            const warehouse = await this.getWarehouseById(warehouseId);
            let selectedProduct = null;
             warehouse.products.forEach((element)=>{
                if(element.product.productId=== productId){
                    selectedProduct = element.product;
                }
            })
            return selectedProduct;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getWarehousesProductNameById(warehouseId, productId){
        try {
            const warehouse = await this.getWarehouseById(warehouseId);
            const productName = await warehouse.products.forEach((element)=>{
                if(element.product.productId === productId){
                    return this.ProductRepository.getProductNameById(element.product.productId);
                }
            })
            return productName;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateWarehousesSelectedProductById(warehouseId, product){
        try {
            const warehouse = await this.getWarehouseById(warehouseId.toString());
            await warehouse.products.map((element)=>{
                if(element.product.productId === product.productId) {
                    element.product = product;
                }
            })
            await warehouse.save();
            return warehouse;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateWarehousesProductsById(id,productsUpdates){
        try {
            async function updateWarehousesProducts(productUpdatesArray){
                try {
                } catch (error) {
                    throw new Error(error);
                }
            }
            const warehouseProduct = await this.getWarehousesSelectedProductById(id.toString(),'123456')
            return updatedWarehouse;
        } catch (error) {
            throw new Error(error);
        }
    }
    async removeWarehouseById(id){
        try {
            const deletedWarehouse = await this.Warehouse.findByIdAndRemove(id);
            return deletedWarehouse;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = WarehouseRepository;