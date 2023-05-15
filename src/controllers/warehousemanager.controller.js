class WarehouseManagerController{
    constructor({WarehouseManagerService}){
        this.WarehouseManagerService = WarehouseManagerService;
        this.createWarehouseManager = this.createWarehouseManager.bind(this);
        this.loginWarehouseManager = this.loginWarehouseManager.bind(this); 
    }   
    async createWarehouseManager(req,res){
        try {
            const warehouseManager = await this.WarehouseManagerService.createWarehouseManager(req.body);
            return res.status(201).send(warehouseManager);
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }
    async loginWarehouseManager(req,res){
        try {
            const loggedWarehouseManager = await this.WarehouseManagerService.loginWarehouseManager(req.body.email,req.body.password);
            return res.status(200).send(loggedWarehouseManager);
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }
    async addProductsToWarehouse(req,res){
        try {
            const products = await thisWarehouseManagerService.addProductsToWarehouse(req.warehouseManager,req.body);
            
        } catch (error) {
            return res.status(404).send(error);
        }
    }
}
module.exports = WarehouseManagerController;