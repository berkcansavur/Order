const express = require('express');
const router = new express.Router();
const {validateRequest} = require('../middlewares/validation.middleware');
const {validateOrderSchema} = require('../validations/order.validation');
const {container} = require('../di-setup');
const orderController = container.resolve('OrderController');
const auth = require('../middlewares/authentication.middleware');

router.post('/orders',auth,validateRequest(validateOrderSchema),orderController.createOrder);

router.delete('/orders/:orderId/delete',auth,validateRequest(validateOrderSchema),orderController.deleteOrder);

router.post('orders/:orderId/update',auth,validateRequest(validateOrderSchema),orderController.updateOrder);

router.post('/orders/:orderId/assignOrder',auth,orderController.assignOrderToCourier);

router.post('/orders/:orderId/updateStatusApproved',auth,validateRequest(validateOrderSchema),orderController.updateOrderStatusApproved);

router.post('/orders/:orderId/updateStatusDenied',auth,validateRequest(validateOrderSchema),orderController.updateOrderStatusDenied);

router.post('/orders/:orderId/updateStatusPreparingStarted',auth,validateRequest(validateOrderSchema),orderController.updateOrderStatusPreparingStarted);

router.post('/orders/:orderId/updateStatusPreparingCompleted',auth,validateRequest(validateOrderSchema),orderController.updateOrderStatusPreparingCompleted);

router.post('/orders/:orderId/updateStatusOntheway',auth,validateRequest(validateOrderSchema),orderController.updateOrderStatusOntheway);

router.post('/orders/:orderId/updateStatusDelivered',auth,validateRequest(validateOrderSchema),orderController.updateOrderStatusDelivered);

router.post('/orders/:orderId/updateStatusCancelled',auth,validateRequest(validateOrderSchema),orderController.updateStatusCancelled);





module.exports= router;