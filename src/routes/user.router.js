const express= require('express');
const router = new express.Router();
//validator
const {validateRequest} = require('../middlewares/validation.middleware');
//Validations
const {
    validateCreateUserSchema,
    validateLoginUserSchema,
    validateUpdateUserSchema,
    validateDeleteUserSchema,
    validateGetUserSchema} = require('../validations/user.validation');
const {
    validateCreateOrderSchema,
    validateDeleteOrderSchema,
    validateUpdateOrderSchema,
    validateUpdateOrderStatusSchema} = require('../validations/order.validation');
    
const {container} = require('../di-setup');
//Controllers
const userController = container.resolve('UserController');
const orderController = container.resolve('OrderController');
//Authenticaion
const auth = require('../middlewares/authentication.middleware');

//ROUTERS
router.post('/users',validateRequest(validateCreateUserSchema),userController.createUser);

router.post('/users/login', validateRequest(validateLoginUserSchema),userController.loginUser);

router.post('/users/logout', auth ,userController.logoutUser);

router.get('/users/me', auth,validateRequest(validateGetUserSchema),userController.getMe);

router.delete('/users/me', auth, validateRequest(validateDeleteUserSchema),userController.deleteUser);

router.patch('/users/me',auth, validateRequest(validateUpdateUserSchema),userController.updateUser);

// Order Related

router.post('/users/createOrder',auth,validateRequest(validateCreateOrderSchema),orderController.createOrder);

router.delete('/users/:orderId/delete',auth,validateRequest(validateDeleteOrderSchema),orderController.deleteOrder);

router.post('/users/:orderId/update',auth,validateRequest(validateUpdateOrderSchema),orderController.updateOrder);

router.post('/users/:orderId/updateStatusCancelled',auth,validateRequest(validateUpdateOrderStatusSchema),orderController.updateStatusCancelled);


module.exports  = router;