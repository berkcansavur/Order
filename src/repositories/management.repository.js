const mongoose = require('mongoose');
class ManagementRepository{
    constructor({ManagementSchema}){
        this.Management = mongoose.model('Management',ManagementSchema);
    }
    async createManager(manager){
        try {
            const newManager = await this.Management({
                managerName:manager.managerName,
                email:manager.email,
                password:manager.password,
            })
            await newManager.save();
            return newManager;
        } catch (error) {
            throw new Error(error);
        }
    }
    async createManagement(management){
        try {
            const newManagement = await this.Management({
                ...management
            })
            await newManagement.save();
            return newManagement;
        } catch (error) {
            throw new Error(error);
        }
    }      
    async getManagerById(id){
        try {
            const manager = await this.Management.findById(id.toString());
            return manager;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateManagerById(id) {
        try {
            
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteManagerById(id){
        try {
            
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = ManagementRepository;