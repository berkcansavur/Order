const express = require('express');
const router = new express.Router();
const auth = require('../middleware/authentication');
const Order = require('../models/order');
const User = require('../models/user');
const orderService = require('../services/order');
const userService = require('../services/user');
// getting all orders by request
router.post('/orders',auth,async(req,res)=>{
    const order = new Order({
        ...req.body,
        user: req.user._id
    })
    const orderDetails = {
        user: await userService.getUserName(req.user._id),
        details: await order
    }
    try{
        await order.save();
        return res.status(201).send(orderDetails);
    }catch(e){
        return res.status(404).send(e)
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