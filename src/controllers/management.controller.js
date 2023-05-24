module.exports = class ManagementController{
    constructor({ManagementService,WarehouseManagerService}){
        this.ManagementService = ManagementService;
        this.WarehouseManagerService = WarehouseManagerService;

    }
    async createManager(req,res){
        try {
            const newManager = await this.ManagementService.createManager(req.body);
            return res.status(201).send(newManager);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async createManagement(req,res){
        try {
            const newManagement = await this.ManagementService.createManagement(req.body);
            return res.status(201).send(newManagement);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async loginManager(req,res){
        try {
            const loggedInManager = await this.ManagementService.loginManager(req.body.email,req.body.password);
            return res.status(200).send(loggedInManager);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async createWarehouseManager(req,res){
        try {
            const warehouseManager = await this.WarehouseManagerService.createWarehouseManager(req.body);
            return res.status(201).send(warehouseManager);

        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async createWarehouse(req,res){
        try {
            const warehouse = await this.ManagementService.createWarehouse(req.body);
            return res.status(201).send(warehouse);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async createCourier(req,res){
        try {
            const courier = await this.ManagementService.createCourier(req.body);
            return res.status(201).status(courier);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async addProduct(req,res){
        try {
            const product = await this.ManagementService.addProduct(req.body);
            return res.status(201).status(product);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async approveProductSupply(req,res){
        try {
            const productSupply = await this.ManagementService.approveProductSupply(req.params.productSupplyId);
            return res.status(201).send(productSupply);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async rejectProductSupply(req,res){
        try {
            const rejectedProductSupply = await this.ManagementService.rejectProductSupply(req.params.productSupplyId);
            return res.status(404).send(rejectedProductSupply);
        } catch (error) {
            throw new Error(error);
        }
    }
    async approveCourierSupply(req,res){
        try {
            const courierSupply = await this.ManagementService.approveCourierSupply(req.params.courierSupplyId);
            return res.status(201).send(courierSupply);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async rejectCourierSupply(req,res){
        try {
            const courierSupply = await this.ManagementService.rejectCourierSupply(req.params.courierSupplyId);
            return res.status(201).send(courierSupply);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
}
