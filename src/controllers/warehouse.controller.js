class WarehouseController{
    constructor({WarehouseService}){
        this.WarehouseService = WarehouseService;
    }
    async addWarehouse(req,res){
        try {
            const newWarehouse = await this.WarehouseService.addWarehouse(req.body);
            return res.status(201).send(newWarehouse);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async updateWarehousesProductsById(req,res){
        try {
            const updatedWarehouse = await this.WarehouseService.updateWarehousesProductsById(req.params.wareHouseId,req.body);
            return res.status(201).send(updatedWarehouse);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async getWarehousesSelectedProductById(req,res){
        try {
            const products = await this.WarehouseService.getWarehousesSelectedProductById(req.params.wareHouseId,req.body.productId);
            return res.status(201).send(products);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async deleteWarehouse(req,res){
        try {
            const deletedWarehouse = await this.WarehouseService.deleteWarehouseById(req.params.warehouseId);
            return res.status(204).send(deletedWarehouse);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
}
module.exports = WarehouseController;