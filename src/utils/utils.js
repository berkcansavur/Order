const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const Courier = require('../models/courier');
async function authenticateLogger(root,token,user){
    if(root==='courier'){
        const courierToBeAuthenticated = await Courier.findOne({_id:user._id})
        courierToBeAuthenticated.tokens = courierToBeAuthenticated.tokens.concat({token});
        await courierToBeAuthenticated.save();
        const courierReturnedWithToken = {
            courier:courierToBeAuthenticated,
            token:token
        }
        return courierReturnedWithToken;
    }
    if(root==='user'){
        const userToBeAuthenticated = await User.findOne({_id:user._id})
        userToBeAuthenticated.tokens = userToBeAuthenticated.tokens.concat({token});
        await userToBeAuthenticated.save();
        const userReturnedWithToken = {
            user:userToBeAuthenticated,
            token:token
        }
        return userReturnedWithToken;
    }
}
async function generateAuthToken(root,Id){
    if(root === 'courier'){
        const token = jwt.sign({courierId: Id },process.env.JWT_SECRET);
        return token;
    }   
    if(root === 'user'){ 
        const token = jwt.sign({userId: Id },process.env.JWT_SECRET);
        return token;
    }
    
}
async function findByCredentials(root,email,password){
    if(root==='user'){
        const user = await User.findOne({email});
        if(!user){
            throw new Error('Unable to login');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error('Unable to login');
        }
        return user;
    }
    if(root==='courier'){
        const courier = await Courier.findOne({email});
        if(!courier){
            throw new Error('Unable to login');
        }
        const isMatch = await bcrypt.compare(password, courier.password);
        if(!isMatch){
            throw new Error('Unable to login');
        }
        return courier;
    }
}
module.exports = {
    generateAuthToken,
    findByCredentials,
    authenticateLogger
};