const User =require('../models/user');
const jwt = require('jsonwebtoken');
const auth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer','');
        console.log(token);
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        const user = await User.findOne({_id: decoded._id,'tokens.token':token});
        if (!user) {
            throw new Error('User can not found !');
        }
        req.token = token;
        req.user = user;
        next();
    }catch (e) {
        return res.status(401).send({e: 'Unauthorized'});
    }
}
module.exports = auth