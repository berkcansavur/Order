const User =require('../models/user.model');
const jwt = require('jsonwebtoken');
const auth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded) {
            throw new Error('token can not verify');
        }
        const user = await User.findOne({_id: decoded._id,'tokens.token':token});
        if (!user) {
            throw new Error('User can not found !');
        }
        req.token = token;
        req.user = user;
        next();
    }catch (error) {
        return res.status(401).send({error: 'Unauthorized'});
    }
}
module.exports = auth