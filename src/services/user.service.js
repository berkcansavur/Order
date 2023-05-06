const e = require('express');
const User = require('../models/user.model');
const Utils = require('../utils/utils');
class UserService{
    constructor(userRepository){
            this.userRepository = userRepository;
        }
    async createUser(user){
        try {
            const newUser = await this.userRepository.createUser(user);
            await newUser.save();
            const token = await Utils.generateAuthToken('user',newUser._id);
            const authenticatedUser = await Utils.authenticateLogger('user',token,newUser);
            await authenticatedUser.save();
            return authenticatedUser;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getUserNameById(id){
        try {
            return await this.userRepository.getUserNameById(id);
        } catch (error) {
            throw new Error(error);
        }
    }
    async getUserEmailById(id){
        try {
            return await this.userRepository.getUserEmailById(id);
        } catch (error) {
            throw new Error(error);
        }
    }
    async getAllUsers(){
        try {
            return await this.userRepository.getAllUsers();
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateUserNameById(id,name){
        try {
            const user = await this.userRepository.getUserNameById(id);
            user.name = name;
            await user.save();
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateUserEmailById(id,email){
        try {
            const user = await this.userRepository.getUserEmailById(id);
            user.email = email;
            await user.save();
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteUserById(id){
        try {
            return await this.deleteUserById(id);
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateUserPasswordById(id,password){
        try {
            return await this.userRepository.updateUserPasswordById(id,password);
        } catch (error) {
            throw new Error(error);
        }
    }
    async loginUser(email,password){
        try {
            const user = await Utils.findByCredentials('user',email,password);
            const token = await Utils.generateAuthToken('user',user._id);
            const authenticatedUser = await Utils.authenticateLogger('user',token,user);
            await authenticatedUser.save();
            return authenticatedUser ;
        } catch (error) {
            throw new Error(error);
        }
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
