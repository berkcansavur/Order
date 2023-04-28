const User = require('../models/user');
async function createUser(req) {
    const user = new User(req);
    const token = await user.generateAuthToken();
    await user.save();   
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

module.exports = {
    createUser,
    deleteUser,
    findUser,
    updateUser,
    loginUser,
    logoutUser
};
