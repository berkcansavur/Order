const express = require('express');
const router = new express.Router();
const {validateRequest} = require('../middlewares/validation.middleware');
const {validateCreateCourierSchema} = require('../validations/courier.validation');
const {container} = require('../di-setup');
const courierController = container.resolve('CourierController');
const auth = require('../middlewares/authentication.middleware');
//ROUTERS
router.post('/couriers', validateRequest(validateCreateCourierSchema),courierController.createCourier);

router.post('/couriers/login', validateRequest(validateCreateCourierSchema),courierController.loginCourier);

router.post('/couriers/logout',auth, validateRequest(validateCreateCourierSchema),courierController.logoutCourier);

module.exports = router;