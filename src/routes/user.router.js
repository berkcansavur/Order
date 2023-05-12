const express= require('express');
const router = new express.Router();
const {validateRequest} = require('../middlewares/validation.middleware');
const {validateUserSchema} = require('../validations/user.validation');
const {container} = require('../di-setup');
const userController = container.resolve('UserController');
const auth = require('../middlewares/authentication.middleware');
//ROUTERS
router.post('/users',validateRequest(validateUserSchema),userController.createUser);

router.post('/users/login', validateRequest(validateUserSchema),userController.loginUser);

router.post('/users/logout', auth, validateRequest(validateUserSchema),userController.logoutUser);

router.get('/users/me', auth,validateRequest(validateUserSchema),userController.getMe);

router.delete('/users/me', auth, validateRequest(validateUserSchema),userController.deleteUser);

router.patch('/users/me',auth, validateRequest(validateUserSchema),userController.updateUser);
module.exports  = router;