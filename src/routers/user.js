const express= require('express');
const router = new express.Router();
const User = require('../models/user');
router.post('/users',async(req,res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        return res.status(201).send({user:user})
    }catch(e){
        return res.status(400).send(e);
    } 
})
router.delete('/users/me',async(req,res)=>{
    try{
        await req.user.remove();
        return res.status(200).send(req.user);
    }catch(e){
        return res.status(404).send(e);
    }
})
module.exports  = router;