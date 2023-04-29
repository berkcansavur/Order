const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
async function generateAuthToken(userId){
    const userToBeAuthenticated = await User.findOne({_id:userId.toString()}); 
    const token = jwt.sign({userId: userId },process.env.JWT_SECRET);
    userToBeAuthenticated.tokens = userToBeAuthenticated.tokens.concat({token});
    await userToBeAuthenticated.save();
    return token;
}
async function findByCredentials(email,password){
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
module.exports = {
    generateAuthToken,
    findByCredentials
};