const User = require('../models/user.model');
const Utils = require('../utils/utils');
class UserService{
    constructor(userRepository){
            this.userRepository = userRepository;
        }
    async createUser(user){
        try {
            const newUser = await this.userRepository.createUser(user);
            const token = await Utils.generateAuthToken('user',newUser._id);
            const authenticatedUser = await Utils.authenticateLogger('user',token,newUser);
            await authenticatedUser.save();
            return authenticatedUser;
        } catch (error) {
            throw new Error(error);
        }
    }
    async finUserById(id){
        return this.userRepository.finUserById(id);
    }
    async finUserByEmail(email){
        return this.userRepository.finUserByEmail(email);
    }
    async updateUser(user){
            return this.userRepository.updateUser(user);
        }
}
async function findUser(user){
    const returnedUser = await User.findById(user._id);
    return returnedUser;
}
async function loginUser(email,password){
    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        const loggedUser ={
            user,
            token
        }
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
