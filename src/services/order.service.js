const UserService = require('./user.service.js');
class OrderService{
    constructor({orderRepository}){
        this.orderRepository = orderRepository;
    }
    async createOrder(order,user){
        try {
            const newOrder = await this.orderRepository.createOrder(order,user);
            const orderDetails = {
                user: await UserService.getUserNameById(user._id),
                details: newOrder
            }
        return orderDetails;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getOrderById(id){
        return this.orderRepository.getOrderById(id);
    }
    async updateOrderById(id, order){
        try {
            return this.orderRepository.updateOrderById(id, order);
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteOrderById(id){
        return this.orderRepository.deleteOrderById(id);
    }
}
module.exports = OrderService;