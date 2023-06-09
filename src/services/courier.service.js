const Utils = require('../utils/utils');
class CourierService{
    constructor({CourierRepository,OrderRepository}){
        this.CourierRepository = CourierRepository;
        this.OrderRepository = OrderRepository;
    }
    async createCourier(courier){
        try {
            const newCourier = await this.CourierRepository.createCourier(courier);
            return newCourier;
        } catch (error) {
            throw new Error(error);
        }
    }
    async loginCourier(email, password){
        try {
            const courier = await Utils.findByCredentials('courier', email, password);
            const token =  Utils.generateAuthToken('courier', courier._id);
            const authenticatedCourier = await Utils.authenticateLogger('courier', token, courier);
            return authenticatedCourier;
        } catch (error) {
            throw new Error('Courier has not login on CourierService.loginUser');
        }
    }
    async logoutCourier(courier,token){
        try {
            const loggedoutCourier = await this.CourierRepository.removeCouriersToken(courier,token);
            if(!loggedoutCourier){
                throw new Error('Couriers token has not removed');
            }
            const returnMessage = "Courier "+loggedoutCourier.courierName+" has been logged out";
            return returnMessage;
        } catch (error) {
            throw new Error('Courier has not been logged out');
        }
    }
    async deleteCourierById(id){
        try {
            const courier = await this.CourierRepository.deleteCourierById(id);
            const returnMessage = "Courier "+courier.courierName+" has been deleted";
            return returnMessage;
        } catch (error) {
            throw new Error('Courier could not deleted.')
        }
    }
    async getCourierOrdersById(courierId){
        try {
            const courier = await this.CourierRepository.getCourierById(courierId.toString());
            const orders = courier.orders;
            return orders;
        } catch (error) {
            throw new Error(error);
        }
    }
    async removeCourierOrderById(courierId,orderId){
        try {
            const order = await this.OrderRepository.getOrderById(orderId);
            const courier = await this.CourierRepository.removeCourierOrderById(courierId,order);
            return courier;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = CourierService;