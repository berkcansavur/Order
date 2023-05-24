const Utils = require('../utils/utils');
class ManagementService{
    constructor({ManagementRepository,WarehouseRepository,WarehouseManagerRepository,CourierRepository,ProductRepository,ProductSupplyRepository,CourierSupplyRepository}){
        this.ManagementRepository = ManagementRepository;
        this.WarehouseRepository =WarehouseRepository;
        this.WarehouseManagerRepository = WarehouseManagerRepository;
        this.CourierRepository = CourierRepository;
        this.ProductRepository = ProductRepository;
        this.ProductSupplyRepository = ProductSupplyRepository;
        this.CourierSupplyRepository = CourierSupplyRepository;
    }
    async createManager(manager){
        try {
            const newManager = await this.ManagementRepository.createManager(manager);
            const token = await Utils.generateAuthToken('manager',newManager._id);
            const createdManager = await this.ManagementRepository.getManagerById(newManager._id);
            const authenticatedManager = await Utils.authenticateLogger('manager',token,createdManager); ;
            return authenticatedManager;
        } catch (error) {
            throw new Error(error);
        }
    }
    async loginManager(email, password){
        try {
            const manager = await Utils.findByCredentials('manager',email,password);
            const token = await Utils.generateAuthToken('manager',manager._id);
            const authenticatedManager = await Utils.authenticateLogger('manager',token,manager);
            return authenticatedManager;
        } catch (error) {
            throw new Error(error);
        }
    }
    async createManagement(management){
        try {
            const newManagement = await this.ManagementRepository.createManagement(management);
            return newManagement;
        } catch (error) {
            throw new Error(error);
        }
    }
    async createWarehouseManager(warehouseManager){
        try {
            const newWarehouseManager = await this.WarehouseManagerRepository.createWarehouseManager(warehouseManager);
            return newWarehouseManager;
        } catch (error) {
            throw new Error(error);
        }
    }
    async createWarehouse(warehouse){
        try {
            const newWarehouse = await this.WarehouseRepository.addWarehouse(warehouse);
            return newWarehouse;
        } catch (error) {
            throw new Error(error);
        }
    }
    async createCourier(courier){
        try {
            const newCourier = await this.CourierRepository.createCourier(courier);
            return newCourier;
        } catch (error) {
            throw new Error(error);
        }
    }
    async addProduct(product){
        try {
            const newProduct = await this.ProductRepository.registerProduct(product);
            return newProduct;
        } catch (error) {
            throw new Error(error);
        }
    }
    async approveProductSupply(productSupply){
        try {
            const approvedProductSupply = await this.ProductSupplyRepository.approveProductSupply(productSupply);
            return approvedProductSupply;
        } catch (error) {
            throw new Error(error);
        }
    }
    async rejectProductSupply(productSupply){
        try {
            const rejectedProductSupply = await this.ProductSupplyRepository.rejectProductSupply(productSupply);
            return rejectedProductSupply;
        } catch (error) {
            throw new Error(error);
        }
    }
    async approveCourierSupply(courierSupply){
        try {
            const approvedCourierSupply = await this.CourierSupplyRepository.approveCourierSupply(courierSupply);
            return approvedCourierSupply;
        } catch (error) {
            throw new Error(error);
        }
    }
    async rejectCourierSupply(courierSupply){
        try {
            const rejectedCourierSupply = await this.CourierSupplyRequest(courierSupply);
            return rejectedCourierSupply;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = ManagementService;