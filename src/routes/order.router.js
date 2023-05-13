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


module.exports= router;