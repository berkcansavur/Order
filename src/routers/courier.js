const express = require('express');
const router =new express.Router();
const auth = require('../middleware/authentication');
const courierService = require('../services/courier');
router.post('/couriers', async(req, res)=>{
    try{
        return res.status(201).send(await courierService.createCourier(req.body));
    }catch{
        return res.status(400).send('email is already in use');
    }
});
router.post('/couriers/login', async(req, res)=>{
    try{
        return res.send(await courierService.loginCourier(req.body.email,req.body.password));
    }catch(error){
        return res.status(400).send('Can not login');
    }
})
router.delete('/couriers/me', auth, async(req, res)=>{
    try {
        return res.send(await courierService.deleteCourier(req.courier._id))
    } catch (error) {
        return res.status(400).send('Can not delete the courier account');
    }
})
module.exports = router;