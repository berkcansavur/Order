const Utils = require('../utils/utils');
module.exports = class WarehouseManagerService{
    constructor({WarehouseManagerRepository,ProductRepository,CourierRepository,ProductSupplyService}){
        this.ProductRepository = ProductRepository;
        this.CourierRepository = CourierRepository;
        this.ProductSupplyService = ProductSupplyService;
        this.WarehouseManagerRepository = WarehouseManagerRepository;
    }
    async createWarehouseManager(warehouseManager){
        try {
            const newWarehouseManager = await this.WarehouseManagerRepository.createWarehouseManager(warehouseManager);
            return newWarehouseManager;
        } catch (error) {
            throw new Error(error);
        }
    }
    async loginWarehouseManager(email, password){
        try {
            const warehouseManager = await Utils.findByCredentials('warehousemanager',email,password);
            const token = await Utils.generateAuthToken('warehousemanager',warehouseManager._id);
            const authenticatedUserManager = await Utils.authenticateLogger('warehousemanager',token,warehouseManager);
            return authenticatedUserManager;
        } catch (error) {
            throw new Error(error);
        }
    }
    async createProductSupplyRequest(productSupplyRequest){
        try {
            const newProductSupplyRequest = await this.ProductSupplyService.createProductSupplyRequest(productSupplyRequest);
            return newProductSupplyRequest;
        } catch (error) {
            throw new Error(error);
        }
    }
    async createCourierSupplyRequest(courierSupplyRequest){
        try {
            const courierSupply = '';  
        } catch (error) {
            throw new Error(error);
        }
    }
}