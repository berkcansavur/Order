const mongoose = require('mongoose');
class OrderRepository{
    constructor({OrderSchema}){
        this.Order = mongoose.model('Order', OrderSchema);
        this.createOrder = this.createOrder.bind(this);
        this.getOrderById = this.getOrderById.bind(this);
        this.deleteOrderById = this.deleteOrderById.bind(this);
        this.updateOrderById = this.updateOrderById.bind(this);
        
    }
    async createOrder(order,user){
        try {
            
            const products = order.products.map(product => {
                return {
                  product: {
                    productName: product.productName,
                    quantity: product.quantity
                  }
                };
              });
            const newOrder = await this.Order({
                customer:{
                    _id:user._id.toString(),
                    name:user.name.toString(),
                    email:user.email.toString(),
                },
                products              
            });
            await newOrder.save();
            return newOrder;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getOrderById(id){
        try {
            const order =await this.Order.findById(id);
            return order;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getAllOrders(){
        try {
            const orders = await this.Order.find();
            return orders;
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteOrderById(id){
        try {
            const order = await this.Order.findByIdAndRemove(id);
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