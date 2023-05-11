const Utils = require('../utils/utils');
class CourierService{
    constructor({CourierRepository}){
        this.CourierRepository = CourierRepository;
        this.createCourier = this.createCourier.bind(this);
    }
    async createCourier(courier){
        try {
            const newCourier = await this.CourierRepository.createCourier(courier);
            const token = await Utils.generateAuthToken('courier',newCourier._id);
            const createdCourier = await this.CourierRepository.getCourierById(newCourier._id);
            const authenticatedCourier = await Utils.authenticateLogger('courier',token,createdCourier);
            return authenticatedCourier;
        } catch (error) {
            throw new Error('Courier has not been created on CourierService.createUser');
        }
    }
    async loginCourier(email, password){
        try {
            const courier = await Utils.findByCredentials('courier', email, password);
            const token = await Utils.generateAuthToken('courier', courier._id);
            const authenticatedCourier = await Utils.authenticateLogger('courier', token, courier);
            return authenticatedCourier;
        } catch (error) {
            throw new Error('Courier has not login on CourierService.loginUser');
        }
    }
}
module.exports = CourierService;