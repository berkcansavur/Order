const express = require('express');
const router = new express.Router();
const auth = require('../middleware/authentication');
const orderService = require('../services/order');
// getting all orders by request
router.post('/orders', auth, async(req,res)=>{
    try{
        return res.send(await orderService.createOrder(req.body, req.user._id));
    }catch(error){
        return res.status(400).send(error);
    }
})
router.patch('/orders/:orderId/assignOrder',auth,async(req,res)=>{
    try {
        return res.send(await orderService.assignSelectedOrderToLoggedCourier(req.params.orderId, req.courier));
    }catch(error) {
        return res.send(error);
    }
});
router.patch('/orders/:orderId/updateStatusApproved',auth,async(req,res)=>{
    try {
        return res.send(await orderService.updateOrderStatusToApproved(req.params.orderId));
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.patch('/orders/:orderId/updateStatusDenied',auth,async(req,res)=>{
    try {
        return res.send(await orderService.updateOrderStatusToDenied(req.params.orderId));
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.patch('/orders/:orderId/updateStatusPreparing',auth,async(req,res)=>{
    try {
        return res.send(await orderService.updateOrderStatusToPreparing(req.params.orderId));
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.patch('/orders/:orderId/updateStatusOntheway',auth,async(req,res)=>{
    try {
        return res.send(await orderService.updateOrderStatusToOntheway(req.params.orderId));
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.patch('/orders/:orderId/updateStatusDelivered',auth,async(req,res)=>{
    try {
        return res.send(await orderService.updateOrderStatusToDelivered(req.params.orderId));
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.patch('/orders/:orderId/updateStatusCancelled',auth,async(req,res)=>{
    try {
        return res.send(await orderService.updateOrderStatusToCancelled(req.params.orderId));
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.patch('/orders/update',auth,async(req, res)=>{
    try {
        return res.send(await orderService.updateOrder(req.body));    
    } catch (error) {
        return res.status(500).send(error);   
    } 
})
router.delete('/orders/:orderId/delete',auth,async(req, res)=>{
    try {
        return res.send(await orderService.deleteOrder(req.params.orderId));
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.get('/orders/pendingOrder',auth,async(req, res)=>{
    try {
        return res.send(await orderService.getPendingOrder(req.user._id));
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.get('/orders/deliveredOrder',auth,async(req, res)=>{
    try {
        return res.send(await orderService.getDeliveredOrder(req.user._id));
    } catch (error) {
        return res.status(500).send(error);
    }
})

module.exports= router;