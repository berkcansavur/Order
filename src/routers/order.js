const express = require('express');
const router = new express.Router();
const Order = require('../models/order');
// getting all orders by request
router.post('/orders',async(req,res)=>{
    const order = new Order({
        ...req.body,
        user: req.user._id
    })
    try{
        await order.save();
        return res.status(201).send(order);
    }catch(e){
        return res.status(404).send(e)
    }
})
router.get('/orders', async(req,res)=>{
    const match = {};
    const sort = {};
    if(req.query.completed){
        match.completed = req.query.completed === 'true';
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
        return res.send(req.user.orders)
    }catch(e){
        return res.status(500).send(e);
    }
})
module.exports= router;