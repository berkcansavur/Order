const express= require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/authentication');
const userService = require('../services/user');
const orderService = require('../services/order');
router.post('/users',async(req,res)=>{
    try{
        return res.status(201).send(await userService.createUser(req.body));
    }catch(e){
        return res.status(400).send('email is already in use');
    } 
});
router.post('/users/login', async(req, res) => {
    try {
        return res.send(await userService.loginUser(req.body.email,req.body.password));
    } catch (e) {
        return res.status(400).send('Cannot Login');
    }
});
router.post('/users/logout', auth, async (req,res)=>{
    try {
        return res.send(await userService.logoutUser(req.user,req.token));
    } catch (error) {
        return res.status(500).send('Cannot logout successfully.');
    }
});
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