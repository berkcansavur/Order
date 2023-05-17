class ManagementController{
    constructor({ManagementService}){
        this.ManagementService = ManagementService;
        this.createManagement = this.createManagement.bind(this);
        this.createManager = this.createManager.bind(this);
        this.loginManager = this.loginManager.bind(this);
        this.createWarehouseManager = this.createWarehouseManager.bind(this);
        this.createWarehouse = this.createWarehouse.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.approveProductSupply = this.approveProductSupply.bind(this);
        this.approveCourierSupply = this.approveCourierSupply.bind(this);

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
            const warehouseManager = await this.ManagementService.createWarehouseManager();
            return res.status(201).send(warehouseManager);

        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async createWarehouse(req,res){
        try {
            const warehouse = await this.ManagementService.createWarehouse();
            return res.status(201).send(warehouse);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async createCourier(req,res){
        try {
            const courier = await this.ManagementService.createCourier();
            return res.status(201).status(courier);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async addProduct(req,res){
        try {
            const product = await this.ManagementService.addProduct();
            return res.status(201).status(product);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async approveProductSupply(req,res){
        try {
            const productSupply = await this.ManagementService.approveProductSupply();
            return res.status(201).send(productSupply);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async approveCourierSupply(req,res){
        try {
            const courierSupply = await this.ManagementService.approveCourierSupply();
            return res.status(201).send(courierSupply);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
}
module.exports = ManagementController;