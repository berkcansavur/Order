const express = require('express');
const router = new express.Router();
const {validateRequest} = require('../middlewares/validation.middleware');
const {validateCreateCourierSchema} = require('../validatios/courier.validation');
const {container} = require('../di-setup');
const courierController = container.resolve('CourierController');
const auth = require('../middlewares/authentication.middleware');

router.post('/courier', validateRequest(validateCreateCourierSchema),courierController.createCourier);

router.post('/couriers/login', validateRequest(validateCreateCourierSchema),courierController.loginUser);

router.post('/couriers/logout',auth, validateRequest(validateCreateCourierSchema),courierController.logoutUser);

module.exports = router;