const Order = require('../models/order.js');
const userService = require('../services/user.js');
const {Status} = require('../utils/constants.js');
async function createOrder(order,user){
    try {
        const newOrder = new Order({
            ...order,
            user:user
        });
        await newOrder.save();
        const orderDetails = {
            user: await userService.getUserName(newOrder.user.toString()),
            details: newOrder
        }
        return orderDetails;
    } catch (error) {
        throw new Error('Create order failed: ' + error.message);
    }
}
async function assignSelectedOrderToLoggedCourier(order,courier){
    try {
        const orderToBeUpdate = await Order.findById(order);
        orderToBeUpdate.status= Status.APPROVED;
        orderToBeUpdate.courier = courier;
        await orderToBeUpdate.save();
        return orderToBeUpdate;
    } catch (error) {
        throw new Error('Assign order failed: ' + error.message);
    }
}
async function updateOrderStatusToApproved(order){
    try {
        const orderTobeUpdate = await Order.findById(order);
        orderTobeUpdate.status=Status.APPROVED;
        await orderTobeUpdate.save();
        return orderTobeUpdate;
    } catch (error) {
        throw new Error(error);
    }
};
async function updateOrderStatusToDenied(order){
    try {
        const orderTobeUpdate = await Order.findById(order);
        orderTobeUpdate.status = Status.DENIED;
        await orderTobeUpdate.save();
        return orderTobeUpdate;
    } catch (error) {
        throw new Error(error);
    }
};
async function updateOrderStatusToPreparing(order){
    try {
        const orderToBeUpdate = await Order.findById(order);
        orderToBeUpdate.status = Status.PREPARING_STARTED;
        await orderToBeUpdate.save();
        return orderToBeUpdate;
    } catch (error) {
        throw new Error(error);
    }
};
async function updateOrderStatusToOntheway(order){
    try {
        const orderToBeUpdate = await Order.findById(order);
        orderToBeUpdate.status = Status.ONTHEWAY;
        await orderToBeUpdate.save();
        return orderToBeUpdate;
    } catch (error) {
        throw new Error(error);
    }
};
async function updateOrderStatusToDelivered(order){
    try {
        const orderToBeUpdate = await Order.findById(order);
        orderToBeUpdate.status = Status.DELIVERED;
        await orderToBeUpdate.save();
        return orderToBeUpdate;
    } catch (error) {
        throw new Error(error);
    }
}
async function updateOrderStatusToCancelled(order){
    try {
        const orderToBeUpdate = await Order.findById(order);
        orderToBeUpdate.status = Status.CANCELLED;
        await orderToBeUpdate.save();
        return orderToBeUpdate;
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
async function deleteOrder(orderId){
    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        return ('Order '+deletedOrder._id+' is deleted');
    } catch (error) {
        throw new Error(error);
    }
}
async function getPendingOrder(userId){
    try {
        const orders = await Order.find({user:userId}).lean().exec();
        const pendingOrders = orders.filter((order)=>(order.status==='Pending'));
        
        return pendingOrders;
        
    } catch (error) {
        throw new Error('error:'+error);
    }
}
async function getDeliveredOrder(userId){
    try {
        const orders = await Order.find({user:userId});
        const deliveredOrders = orders.filter((order)=>(order.status==='Delivered'));
        return deliveredOrders;  
    } catch (error) {
        throw new Error('error:'+error);
    }
}
module.exports={
    createOrder,
    updateOrder,
    deleteOrder,
    getPendingOrder,
    getDeliveredOrder,
    assignSelectedOrderToLoggedCourier,
    updateOrderStatusToApproved,
    updateOrderStatusToDenied,
    updateOrderStatusToPreparing,
    updateOrderStatusToOntheway,
    updateOrderStatusToDelivered,
    updateOrderStatusToCancelled
}