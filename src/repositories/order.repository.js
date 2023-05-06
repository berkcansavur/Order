class OrderRepository{
    constructor({Order}){
        this.Order = Order;
    }
    async createOrder(order,user){
        const newOrder = new this.Order({
            ...order,
            user:user._id
        });
        await newOrder.save();
        return newOrder;
    }
    async getOrderById(id){
        const order =await this.Order.findById(id);
        return order;
    }
    async getAllOrders(){
        const orders = await this.Order.find();
        return orders;
    }
    async deleteOrderById(id){
        try {
            const order = await this.Order.findById(id);
            await order.remove();
            return order;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateOrderById(id,order){
        try {
            const updatedOrder = await this.Order.findByIdAndUpdate(id,order,{new:true});
            return updatedOrder;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = OrderRepository;