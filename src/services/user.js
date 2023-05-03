const User = require('../models/user');
const Utils =require('../utils/utils');
async function createUser(req) {
    const user = new User(req);
    await user.save(); 
    const token = await Utils.generateAuthToken('user',user._id);
      
    const returnObject = {
        user,
        token
    }
    try {
        return returnObject;
    } catch (error) {
        throw new Error(error)
    }
}
async function findUser(user){
    const returnedUser = await User.findById(user._id);
    return returnedUser;
}
async function loginUser(email,password){
    try {
        const user = await Utils.findByCredentials('user',email, password);
        const token =  await Utils.generateAuthToken('user',user._id);
        const loggedUser= await Utils.authenticateLogger('user',token,user);
        return loggedUser;
    } catch (error) {
        throw new Error(error);
    }
}
async function logoutUser(reqUser,reqToken){
    try {
        reqUser.tokens = reqUser.tokens.filter((token)=>{
            return token.token !== reqToken;
        })
        await reqUser.save();
        return ('user '+reqUser.email+' has been logged out');
    } catch (error) {
        throw new Error(error);
    }
}
async function deleteUser(userId){
    try {
        const user = await User.findByIdAndDelete(userId);
        return ('Removed User '+user.email+' successfully.');
    } catch (error) {
        throw new Error(error);
    }
}
async function updateUser(userId,updates){
    try {
        const user = await User.findByIdAndUpdate(userId,updates,{new:true});
        return ('Updated User '+user.email+' successfully.');
    } catch (error) {
        throw new Error(error);
    }
}
async function getUserName(userId){
    try {
        const user = await User.findById(userId);
        return user.email;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    createUser,
    deleteUser,
    findUser,
    updateUser,
    loginUser,
    logoutUser,
    getUserName
};
