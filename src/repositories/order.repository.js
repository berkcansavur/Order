const mongoose = require('mongoose');

class OrderRepository{
    constructor({OrderSchema,WarehouseRepository,ProductRepository}){
        this.Order = mongoose.model('Order', OrderSchema);
        this.WarehouseRepository = WarehouseRepository;
        this.ProductRepository = ProductRepository;
        this.createOrder = this.createOrder.bind(this);
        this.getOrderById = this.getOrderById.bind(this);
        this.deleteOrderById = this.deleteOrderById.bind(this);
        this.updateOrderById = this.updateOrderById.bind(this);
        
    }
    async createOrder(order,user){
        try {
            const products = [];
            const warehouseId = order.fromWarehouseId;
            order.products.forEach(product => {
                products.push(product);
            });
            const referanceToClass = this;
            async function updateWarehouse(productArray){
                for (let i = 0; i<productArray.length; i++){
                    const product = productArray[i];
                    return await referanceToClass.WarehouseRepository.consumeProductsFromWarehouseById(warehouseId,product.product);
                }
            }
            await updateWarehouse(order.products);
            const newOrder = await this.Order({
                customer:{
                    _id:user._id.toString(),
                    name:user.name.toString(),
                    email:user.email.toString(),
                },
                products:order.products,
                fromWarehouseId:order.fromWarehouseId.toString()              
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