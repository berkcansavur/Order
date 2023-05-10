const express = require('express');
const router = new express.Router();
const{createOrder}= require('../controllers/order.controller');
const auth = require('../middlewares/authentication.middleware');
const OrderService = require('../services/order.service');
const Joi =require('joi');

const validateCreateOrderSchema= Joi.object({
    customerName:Joi.string().required(),
    product:Joi.string().required(),
    quantity:Joi.number().required()
})


// routes
router.post('/orders',auth,async(req,res)=>{
    try{
        const { customerName,product, quantity } = validateCreateOrderSchema.validate(req.body);
        const order = await createOrder({ customerName,product, quantity });
        return res.status(201).json(order);
    }catch(e){
        return res.status(404).send(e)
    }
})
router.patch('/orders/update',auth,async(req, res)=>{
    try {
        return res.send(await OrderService.updateOrder(req.body))
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