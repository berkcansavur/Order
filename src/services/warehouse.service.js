class WarehouseService{
    constructor({WarehouseRepository}){
        this.WarehouseRepository = WarehouseRepository;
        this.addWarehouse = this.addWarehouse.bind(this);
        this.updateWarehousesProductsById = this.updateWarehousesProductsById.bind(this);
        this.getWarehousesSelectedProductById = this.getWarehousesSelectedProductById.bind(this);
    }
    async addWarehouse(warehouse){
        try {
            const newWarehouse = await this.WarehouseRepository.addWarehouse(warehouse);
            return newWarehouse;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateWarehousesProductsById(id,updatedProducts){
        try {
            const updatedWarehouse = await this.WarehouseRepository.updateWarehousesProductsById(id,updatedProducts);
            return updatedWarehouse;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getWarehousesSelectedProductById(warehouseId,productId){
        try {
            const products = await this.WarehouseRepository.getWarehousesSelectedProductById(warehouseId,productId);
            return products;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = WarehouseService;