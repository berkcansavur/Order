class OrderService{
    constructor({OrderRepository,ProductRepository,WarehouseRepository}){
        this.OrderRepository = OrderRepository;
        this.WarehouseRepository = WarehouseRepository;
        this.ProductRepository = ProductRepository;
        this.createOrder = this.createOrder.bind(this);
        this.getOrderById = this.getOrderById.bind(this);
        this.assignOrderToCourier = this.assignOrderToCourier.bind(this);
        this.updateOrderById = this.updateOrderById.bind(this);
        this.deleteOrderById = this.deleteOrderById.bind(this);
        this.updateOrderStatusApprovedById = this.updateOrderStatusApprovedById.bind(this);
        this.updateOrderStatusDeniedById = this.updateOrderStatusDeniedById.bind(this);
        this.updateOrderStatusPreparingStartedById = this.updateOrderStatusPreparingStartedById.bind(this);
        this.updateOrderStatusPreparingCompletedById = this.updateOrderStatusPreparingCompletedById.bind(this);
        this.updateOrderStatusOnthewayById = this.updateOrderStatusOnthewayById.bind(this);
        this.updateOrderStatusDeliveredById = this.updateOrderStatusDeliveredById.bind(this);
        this.updateStatusCancelledById = this.updateStatusCancelledById.bind(this);

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
    async assignOrderToCourier(orderId,courier){
        try {
            const orderToAssign = await this.OrderRepository.getOrderById(orderId);
            orderToAssign.courier = courier;
            orderToAssign.status = 200
            await orderToAssign.save();
            return orderToAssign;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateOrderStatusApprovedById(orderId){
        try {
            const order =await this.OrderRepository.getOrderById(orderId.toString());
            order.status = 200;
            await order.save();
            return order;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateOrderStatusDeniedById(orderId){
        try {
            const order = await OrderRepository.getOrderById(orderId.toString());
            order.status = 600;
            await order.save();
            return order;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateOrderStatusPreparingStartedById(orderId){
        try {
            const order = await this.OrderRepository.getOrderById(orderId.toString());
            order.status = 300;
            await order.save();
            return order;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateOrderStatusPreparingCompletedById(orderId){
        try {
            const order = await this.OrderRepository.getOrderById(orderId.toString());
            order.status = 310;
            await order.save();
            return order;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateOrderStatusOnthewayById(orderId){
        try {
            const order = await this.OrderRepository.getOrderById(orderId.toString());
            order.status =400;
            await order.save();
            return order;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateOrderStatusDeliveredById(orderId){
        try {
            const order = await this.OrderRepository.getOrderById(orderId.toString());
            order.status = 500;
            await order.save();
            return order;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateStatusCancelledById(orderId){
        try {
            const order=await this.OrderRepository.getOrderById(orderId.toString());
            order.status = 700;
            await order.save();
            return order;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = OrderService;