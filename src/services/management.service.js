const Utils = require('../utils/utils');
class ManagementService{
    constructor({ManagementRepository}){
        this.ManagementRepository = ManagementRepository;
        this.createManagement = this.createManagement.bind(this);
        this.createManager = this.createManager.bind(this);
        this.loginManager = this.loginManager.bind(this);
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
}
module.exports = ManagementService;