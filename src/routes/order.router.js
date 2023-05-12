const express = require('express');
const router = new express.Router();
const {validateRequest} = require('../middlewares/validation.middleware');
const {validateOrderSchema} = require('../validations/order.validation');
const {container} = require('../di-setup');
const orderController = container.resolve('OrderController');
const auth = require('../middlewares/authentication.middleware');

router.post('/orders',auth,validateRequest(validateOrderSchema),orderController.createOrder);

// routes
// router.post('/orders',auth,)
// router.patch('/orders/update',auth,async(req, res)=>{
//     try {
//         return res.send(await OrderService.updateOrder(req.body))
//     } catch (error) {
//         return res.status(500).send(error);   
//     } 
// })
// router.get('/orders', auth, async(req,res)=>{
//     const match = {};
//     const sort = {};
//     if(req.query.status){
//         match.status = req.query.status === 'delivered';
//     }
//     if(req.query.sortBy){
//         const parts =req.query.sortBy.split(':');
//         sort[parts[0]]= parts[1]==='desc'?-1:1
//     }try{
//         await req.user.populate({
//             path:'orders',
//             match,
//             options:{
//                 limit:parseInt(req.query.limit),
//                 skip:parseInt(req.query.skip),
//                 sort
//             }
//         })
//         return res.send(req.user.orders);
//     }catch(e){
//         return res.status(500).send(e);
//     }
// })

module.exports= router;