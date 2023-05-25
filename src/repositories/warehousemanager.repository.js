const mongoose = require('mongoose');
class WarehouseManagerRepository{
    constructor({WarehouseManagerSchema}){
        this.WarehouseManager = mongoose.model('WarehouseManager', WarehouseManagerSchema);
    }
    async createWarehouseManager(warehouseManager){
        try {
            const newWarehouseManager = await this.WarehouseManager({
                ...warehouseManager
            });
            await newWarehouseManager.save();
            return newWarehouseManager;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getWarehouseManagerById(id){
        try {
            const newWarehouseManager = await this.WarehouseManager.findById(id);
            return newWarehouseManager;
        } catch (error) {
            throw new Error(error);
        }
    }
    async addProductsToWarehouse(warehouseId,products){
        try {
            const warehouse = await this.WarehouseManager.findById(warehouseId);
            
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = WarehouseManagerRepository;