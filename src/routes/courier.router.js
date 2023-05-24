const express = require('express');
const router = new express.Router();
const {validateRequest} = require('../middlewares/validation.middleware');
const {validateCourierSchema} = require('../validations/courier.validation');
const {validateUpdateOrderStatusSchema}= require('../validations/order.validation');
const {container} = require('../di-setup');
const courierController = container.resolve('CourierController');
const orderController = container.resolve('OrderController');
const auth = require('../middlewares/authentication.middleware');
//ROUTERS
router.post('/couriers/createCourier', validateRequest(validateCourierSchema),courierController.createCourier);

router.post('/couriers/login', validateRequest(validateCourierSchema),courierController.loginCourier);

router.post('/couriers/logout',auth, validateRequest(validateCourierSchema),courierController.logoutCourier);

router.delete('/couriers/removeCourier',auth,validateRequest(validateCourierSchema),courierController.deleteCourier);

router.post('/couriers/logout',auth,validateRequest(validateCourierSchema),courierController.logoutCourier);

router.get('/couriers/myOrders',auth,validateRequest(validateCourierSchema),courierController.getCourierOrdersById);

//Order Related

router.post('/couriers/:orderId/assignOrder',auth,validateRequest(validateUpdateOrderStatusSchema),orderController.assignOrderToCourier);

router.post('/couriers/:orderId/updateStatusApproved',auth,validateRequest(validateUpdateOrderStatusSchema),orderController.updateOrderStatusApproved);

router.post('/couriers/:orderId/updateStatusDenied',auth,validateRequest(validateUpdateOrderStatusSchema),orderController.updateOrderStatusDenied);

router.post('/couriers/:orderId/updateStatusDenied',auth,validateRequest(validateUpdateOrderStatusSchema),orderController.updateOrderStatusDenied);

router.post('/couriers/:orderId/updateStatusPreparingStarted',auth,validateRequest(validateUpdateOrderStatusSchema),orderController.updateOrderStatusPreparingStarted);

router.post('/couriers/:orderId/updateStatusPreparingCompleted',auth,validateRequest(validateUpdateOrderStatusSchema),orderController.updateOrderStatusPreparingCompleted);

router.post('/couriers/:orderId/updateStatusOntheway',auth,validateRequest(validateUpdateOrderStatusSchema),orderController.updateOrderStatusOntheway);

router.post('/couriers/:orderId/updateStatusDelivered',auth,validateRequest(validateUpdateOrderStatusSchema),orderController.updateOrderStatusDelivered);


module.exports = router;