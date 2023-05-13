class OrderService{
    constructor({OrderRepository}){
        this.OrderRepository = OrderRepository;
        this.createOrder = this.createOrder.bind(this);
        this.getOrderById = this.getOrderById.bind(this);
        this.updateOrderById = this.updateOrderById.bind(this);
        this.deleteOrderById = this.deleteOrderById.bind(this);
    }
    async createOrder(order,user){
        try {
            const newOrder = await this.OrderRepository.createOrder(order,user);
            return newOrder;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getOrderById(id){
        try {
            return this.OrderRepository.getOrderById(id);
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateOrderById(id, order){
        try {
            return this.OrderRepository.updateOrderById(id, order);
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteOrderById(id){
        try {
            return this.OrderRepository.deleteOrderById(id);
        } catch (error) {
            throw new Error(error);
        }
    }
    async assignOrderToCourier(order,courier){
        try {
            const orderToAssign = await this.OrderRepository.getOrderById(order._id.toString());
            orderToAssign.courier = {
                _id : courier._id,
                name : courier.name,
                email : courier.email,
                phone : courier.phone
            }
            orderToAssign.status = 200
            await orderToAssign.save();
            return orderToAssign;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = OrderService;