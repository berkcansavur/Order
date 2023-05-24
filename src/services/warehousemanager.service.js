const Utils = require('../utils/utils');
module.exports = class WarehouseManagerService{
    constructor({WarehouseManagerRepository,ProductRepository,CourierRepository,ProductSupplyService}){
        this.ProductRepository = ProductRepository;
        this.CourierRepository = CourierRepository;
        this.ProductSupplyService = ProductSupplyService;
        this.WarehouseManagerRepository = WarehouseManagerRepository;
    }
    async createWarehouseManager(warehouseManager){
        const {WarehouseManagerRepository} = this;
        try {
            const newWarehouseManager = await WarehouseManagerRepository.createWarehouseManager(warehouseManager);
            const token = Utils.generateAuthToken('warehousemanager',newWarehouseManager._id);
            const createdWarehouseManager = await WarehouseManagerRepository.getWarehouseManagerById(newWarehouseManager._id);
            const authenticatedWarehouseManager = await Utils.authenticateLogger('warehousemanager',token,createdWarehouseManager);
            return authenticatedWarehouseManager;
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