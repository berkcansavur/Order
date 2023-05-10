const express= require('express');
const router = new express.Router();
const {validateRequest} = require('../middlewares/validation.middleware');
const {validateCreateUserSchema} = require('../validations/user.validation');
const {container} = require('../di-setup');
const userController = container.resolve('UserController');
const auth = require('../middlewares/authentication.middleware');
//ROUTERS
router.post('/users',validateRequest(validateCreateUserSchema),userController.createUser);

router.post('/users/login', validateRequest(validateCreateUserSchema),userController.loginUser);

router.post('/users/logout', auth, validateRequest(validateCreateUserSchema),userController.logoutUser);

router.get('/users/me', auth,validateRequest(validateCreateUserSchema),userController.getMe);

router.delete('/users/me', auth, validateRequest(validateCreateUserSchema),userController.deleteUser);

router.patch('/users/me',auth, validateRequest(validateCreateUserSchema),userController.updateUser);
module.exports  = router;