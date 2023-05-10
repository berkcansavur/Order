const User =require('../models/user.model');
const jwt = require('jsonwebtoken');
const Courier = require('../models/courier.model');
const {container} = require('../di-setup');
const UserRepository = container.resolve('UserRepository');
const auth = async(req,res,next)=>{
    let root=req.path;
    try{
        if(root.toString().includes('/orders')){
            if(root.toString().includes('/assignOrder')||
            root.toString().includes('/updateStatusApproved')||
            root.toString().includes('/updateStatusDenied')||
            root.toString().includes('/updateStatusPreparingStarted')||
            root.toString().includes('/updateStatusPreparingCompleted')||
            root.toString().includes('/updateStatusOntheway')||
            root.toString().includes('/updateStatusDelivered')){
                const token = req.header('Authorization').replace('Bearer ','');
                const decoded =jwt.verify(token,process.env.JWT_SECRET);
                if(!decoded) {
                throw new Error('token can not verify');
                }
                const courier = await Courier.findOne({_id: decoded.courierId,'tokens.token':token});
                if (!courier) {
                    throw new Error('Courier can not found!');
                }
                req.token = token;
                req.courier = courier;
                next();
            }
            if(root.toString().includes('/updateStatusCancelled')){
                const token = req.header('Authorization').replace('Bearer ','');
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                if(!decoded) {
                    throw new Error('token can not verify');
                }
                const user = await User.findOne({_id: decoded.userId,'tokens.token':token});
                if (!user) {
                    throw new Error('User can not found !');
                }
                req.token = token;
                req.user = user;
                next();
            }
            if(!root.toString().includes('orders/')){
                const token = req.header('Authorization').replace('Bearer ','');
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                if(!decoded) {
                    throw new Error('token can not verify');
                }
                const user = await User.findOne({_id: decoded.userId,'tokens.token':token});
                if (!user) {
                    throw new Error('User can not found !');
                }
                req.token = token;
                req.user = user;
                next();
            }
            
        }
        if(root.toString().includes('/couriers')){
            const token = req.header('Authorization').replace('Bearer ','');
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            if(!decoded) {
            throw new Error('token can not verify');
            }
            const courier = await Courier.findOne({_id:decoded.courierId,'tokens.token':token});
            if (!courier) {
                throw new Error('courier can not found!');
            }
            req.token = token;
            req.courier = courier;
            next();
        }
        if(root.toString().includes('/users')){
            const token = req.header('Authorization').replace('Bearer ','');
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            if(!decoded) {
            throw new Error('token can not verify');
            }
            const user = await UserRepository.getUserById(decoded.userId);
            const findedUser = await user.tokens.filter((tokens)=>{
                return tokens.token == token
            })
            if (!user) {
                throw new Error('User can not found !');
            }
            if(findedUser.length!==0){
                req.token = token;
                req.user = user;
                next();
            }
            if(findedUser.length===0){
                throw new Error('Users token can not be found');
                next();
            }
            
            
        }
    }catch (error) {
        return res.status(401).send({error: 'Unauthorized'});
    }
}
module.exports = auth