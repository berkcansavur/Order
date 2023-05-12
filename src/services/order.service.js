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
        return this.OrderRepository.getOrderById(id);
    }
    async updateOrderById(id, order){
        try {
            return this.OrderRepository.updateOrderById(id, order);
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteOrderById(id){
        return this.OrderRepository.deleteOrderById(id);
    }
}
module.exports = OrderService;