const express = require('express');
const router = new express.Router();
const auth = require('../middleware/authentication');
const orderService = require('../services/order.service');
const userService = require('../services/user.service');
// getting all orders by request
router.post('/orders',auth,async(req,res)=>{
    try{
        return res.status(201).send(await orderService.createOrder(req.body,req.user._id));
    }catch(e){
        return res.status(404).send(e)
    }
})
router.patch('/orders/update',auth,async(req, res)=>{
    try {
        return res.send(await orderService.updateOrder(req.body))
    } catch (error) {
        return res.status(500).send(error);   
    } 
})
router.get('/orders', auth, async(req,res)=>{
    const match = {};
    const sort = {};
    if(req.query.status){
        match.status = req.query.status === 'delivered';
    }
    if(req.query.sortBy){
        const parts =req.query.sortBy.split(':');
        sort[parts[0]]= parts[1]==='desc'?-1:1
    }try{
        await req.user.populate({
            path:'orders',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        })
        return res.send(req.user.orders);
    }catch(e){
        return res.status(500).send(e);
    }
})

module.exports= router;