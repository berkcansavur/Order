const express= require('express');
const router = new express.Router();
const {validateRequest} = require('../middlewares/validation.middleware');
const {validateCreateUserSchema} = require('../validations/user.validation');
const {container} = require('../di-setup');
const userController = container.resolve('UserController');
const User = require('../models/user.model');
const auth = require('../middlewares/authentication.middleware');
//ROUTERS
router.post('/users',validateRequest(validateCreateUserSchema),userController.createUser);

router.post('/users/login', validateRequest(validateCreateUserSchema),userController.loginUser);

router.post('/users/logout', auth, validateRequest(validateCreateUserSchema),userController.logoutUser);
router.get('/users/me', auth, async(req, res) => {
    return res.send(await userService.findUser(req.user));
});
router.get('/users',auth, async(req, res) => {
    try {
        const users = await User.find({});
        return users.send([users])
    } catch (e) {
        return res.status(404).send(e);
    }
});
router.delete('/users/me', auth, async(req,res)=>{
    try{
        return res.send(await userService.deleteUser(req.user._id));
    }catch(e){
        return res.status(500).send();
    }
});
router.patch('/users/me',auth, async(req,res)=>{
    try {
        return res.send(await userService.updateUser(req.user._id,req.body));
    } catch (error) {
        return res.status(500).send(error);
    }
});
module.exports  = router;