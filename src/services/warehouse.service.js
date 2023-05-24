class WarehouseService{
    constructor({WarehouseRepository}){
        this.WarehouseRepository = WarehouseRepository;
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
    async consumeProductsFromWarehouseById(warehouseId,product){
        try {
            const warehouse = await this.WarehouseRepository.getWarehouseById(warehouseId.toString());
            await warehouse.products.map((element)=>{
                if(element.product.productId === product.productId && element.product.productQuantity >= product.productQuantity){
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
            const warehouse = await this.WarehouseRepository.getWarehouseById(warehouseId.toString());
            await warehouse.products.map((element)=>{
                if(element.product.productId === product.productId && element.product.productQuantity>0){
                    const calculation = element.product.productQuantity + product.productQuantity;
                    element.product.productQuantity = calculation;
                }
            })
            await warehouse.save();
            return warehouse;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = WarehouseService;