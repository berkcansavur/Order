const Order = require('../models/order.js');
const userService = require('../services/user.js');
async function createOrder(order,user){
    try {
        const newOrder = new Order({
            ...order,
            user:user._id
        });
        await newOrder.save();
        const orderDetails = {
            user: await userService.getUserName(newOrder.user._id),
            details: newOrder
        }
    return orderDetails;
    } catch (error) {
        throw new Error(error);
    }
}
async function updateOrder(order){
    try {
        const updatedOrder = await Order.findByIdAndUpdate(order._id,order,{new:true});
        const orderDetails = {
            user: await userService.getUserName(updatedOrder.user._id),
            details: updatedOrder
        }
        return orderDetails;
    } catch (error) {
        throw new Error(error);
    }
}
module.exports={
    createOrder,
    updateOrder
}