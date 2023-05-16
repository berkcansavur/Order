const express = require('express');
const router = new express.Router();
const {validateRequest} = require('../middlewares/validation.middleware');
const {validateCourierSchema} = require('../validations/courier.validation');
const {container} = require('../di-setup');
const courierController = container.resolve('CourierController');
const auth = require('../middlewares/authentication.middleware');
//ROUTERS
router.post('/couriers/createCourier', validateRequest(validateCourierSchema),courierController.createCourier);

router.post('/couriers/login', validateRequest(validateCourierSchema),courierController.loginCourier);

router.post('/couriers/logout',auth, validateRequest(validateCourierSchema),courierController.logoutCourier);

router.delete('/couriers/removeCourier',auth,validateRequest(validateCourierSchema),courierController.deleteCourier);

router.post('/couriers/logout',auth,validateRequest(validateCourierSchema),courierController.logoutCourier);

router.get('/couriers/myOrders',auth,validateRequest(validateCourierSchema),courierController.getCourierOrdersById);
module.exports = router;