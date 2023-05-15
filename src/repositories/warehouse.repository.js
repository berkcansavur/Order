const mongoose = require('mongoose');
class WarehouseRepository{
    constructor({WarehouseSchema}){
        this.Warehouse = mongoose.model('Warehouse',WarehouseSchema);
        this.addWarehouse = this.addWarehouse.bind(this);
        this.removeWarehouseById = this.removeWarehouseById.bind(this);
        this.getWarehouseById= this.getWarehouseById.bind(this);
        this.getWarehousesProductsById = this.getWarehousesProductsById.bind(this);
        this.getWarehousesSelectedProductById = this.getWarehousesSelectedProductById.bind(this);
        this.consumeProductsFromWarehouseById = this.consumeProductsFromWarehouseById.bind(this);
        this.addProductsToWarehouseById = this.addProductsToWarehouseById.bind(this);
        this.updateWarehousesSelectedProductById = this.updateWarehousesSelectedProductById.bind(this);
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
    async consumeProductsFromWarehouseById(warehouseId, product){
        try {
            const warehouse = await this.getWarehouseById(warehouseId.toString());
            await warehouse.products.map((element)=>{
                if(element.product.productId === product.productId|| element.product.productQuantity >= product.productQuantity) {
                    const calcualtion = element.product.productQuantity-product.productQuantity;
                    element.product.productQuantity = calcualtion;
                }
            })
            await warehouse.save();
            return warehouse;
        } catch (error) {
            throw new Error(error);
        }
    }
    async addProductsToWarehouseById(warehouseId, product){
        try {
            const warehouse = await this.getWarehouseById(warehouseId.toString());
            await warehouse.products.map((element)=>{
                if(element.product.productId === product.productId || element.product.productQuantity>0){
                    const calculation = element.product.productQuantity + product.productQuantity;
                    element.product.productQuantity = calculation;
                }
            })
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
    async consumeProductsFromWarehouse(warehouseId,product){
        try {
            
        } catch (error) {
            
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