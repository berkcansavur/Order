const Order = require('../models/order.js');
async function createOrder(order,user){
    const returnOrder = new Order({order,user});
    await returnOrder.save();
    return returnOrder;
}