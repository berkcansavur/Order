const express= require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/authentication');
const userService = require('../services/user');
const orderService = require('../services/order');
router.post('/users',async(req,res)=>{
    try{
        const user = await userService.createUser(req.body);
        return res.status(201).send(user);
    }catch(e){
        return res.status(400).send('email is already in use');
    } 
})
router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        return res.send({user, token});
    } catch (e) {
        return res.status(400).send('Cannot Login');
    }
})
router.post('/users/logout', auth, async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        })
        await req.user.save();
        return res.send('Logged out successfully.')
        
    } catch (error) {
        return res.status(500).send('Cannot logout succesfully.');
    }
} )
router.get('/users/me', auth, async(req, res) => {
    return res.send(req.user);
})
router.get('/users',auth, async(req, res) => {
    try {
        const users = await User.find({});
        return users.send([users])
    } catch (e) {
        return res.status(404).send(e);
    }
})
router.delete('/users/me', auth, async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.user._id);
        return res.send('Removed User '+user.name+' successfully.')
    }catch(e){
        return res.status(500).send();
    }
})
module.exports  = router;