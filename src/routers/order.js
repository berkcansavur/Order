const express = require('express');
const router = new express.Router();
const auth = require('../middleware/authentication');
const orderService = require('../services/order');
const userService = require('../services/user');
// getting all orders by request
router.post('/orders',auth,async(req,res)=>{
    try{
        return res.status(201).send(orderService.createOrder(req.body,req.user._id));
    }catch(e){
        return res.status(404).send(e);
    }
})
router.patch('/orders/update',auth,async(req, res)=>{
    try {
        return res.send(orderService.updateOrder(req.body))
    } catch (error) {
        return res.status(500).send(error);   
    } 
})
router.delete('/orders/delete',auth,async(req, res)=>{
    try {
        return res.send(orderService.deleteOrder(req.body._id))
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.get('/orders/pendingOrder',auth,async(req, res)=>{
    try {
        return res.send(orderService.getPendingOrder(req.user._id));
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports= router;