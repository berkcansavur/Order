const User = require('../models/user');
const Utils =require('../utils/utils');
const UserRepository = require('../repositories/UserRepository');
async function createUser(req) {
    return await UserRepository.createUser(req);
}
async function findUserById(user){
    return await UserRepository.findUserById(user);
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
        const user = await UserRepository.removeUsersToken(reqUser,reqToken);
        if(!user){
            return ('User could not found');
        }
        return ('user '+user.email+' has been logged out');
    } catch (error) {
        throw new Error(error);
    }
}
async function deleteUser(userId){
    try {
        return await UserRepository.deleteUserById(userId);
    } catch (error) {
        throw new Error(error);
    }
}
async function updateUserById(userId,updates){
    try {
        const user = await UserRepository.updateUserById(userId,updates);
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
    findUserById,
    updateUserById,
    loginUser,
    logoutUser,
    getUserName
};
