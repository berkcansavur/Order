module.exports = class OrderService{
    constructor({OrderRepository,ProductRepository,WarehouseService}){
        this.OrderRepository = OrderRepository;
        this.ProductRepository = ProductRepository;
        this.WarehouseService = WarehouseService
    }
    async createOrder(order,user){
        try {
            for (const product of order.products) {
                await this.WarehouseService.consumeProductsFromWarehouseById(order.fromWarehouseId,product.product);
            };
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
            const order = await this.OrderRepository.getOrderById(orderId);
            order.courier = courier;
            order.status = 200
            await order.save();
            await this.assignCourierToOrder(orderId, courier);
            return order;
        } catch (error) {
            throw new Error(error);
        }
    }
    async assignCourierToOrder(orderId,courier){
        try {
            const order = await this.OrderRepository.getOrderById(orderId);
            courier.orders = [{order:order},{new:true}];
            await courier.save();
            return courier;
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