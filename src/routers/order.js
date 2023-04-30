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
router.patch('/orders/assignOrder',auth,async(req,res)=>{
    try {
        return res.send(await orderService.assignSelectedOrderToLoggedCourier(req.body, req.courier));
    }catch(error) {
        return res.send(error);
    }
});
router.patch('/orders/updateStatusApproved',auth,async(req,res)=>{
    try {
        return res.send(await orderService.updateOrderStatusToApproved(req.body));
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.patch('/orders/updateStatusDenied',auth,async(req,res)=>{
    try {
        return res.send(await orderService.updateOrderStatusToDenied(req.body));
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.patch('/orders/updateStatusPreparing',auth,async(req,res)=>{
    try {
        return res.send(await orderService.updateOrderStatusToPreparing(req.body));
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.patch('/orders/updateStatusOntheway',auth,async(req,res)=>{
    try {
        return res.send(await orderService.updateOrderStatusToOntheway(req.body));
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.patch('/orders/updateStatusDelivered',auth,async(req,res)=>{
    try {
        return res.send(await orderService.updateOrderStatusToDelivered(req.body));
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.patch('/orders/updateStatusCancelled',auth,async(req,res)=>{
    try {
        return res.send(await orderService.updateOrderStatusToCancelled(req.body));
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
router.delete('/orders/delete',auth,async(req, res)=>{
    try {
        return res.send(await orderService.deleteOrder(req.body._id));
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