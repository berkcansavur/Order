const User = require('../models/user');
const Utils = require('../utils/utils');

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
};
async function findUserById(user){
    const returnedUser = await User.findById(user._id);
    return returnedUser;
};
async function findUserByEmail(email) {
    return User.findOne({ email });
};
async function removeUsersToken(user,reqToken){
    try {
            user.tokens = user.tokens.filter((token)=>{
            return token.token!== reqToken;
            });
            await user.save();
            return user;
        } 
        catch (error) {
            return ('Users token could not be removed.')
        }
}
async function updateUserById(userId,updates){
    try {
        const user = await User.findByIdAndUpdate(userId,updates,{new:true});
        return ('Updated User '+user.email+' successfully.');
    } catch (error) {
        throw new Error(error);
    }
};
async function deleteUserById(userId){
    try {
        const user = await User.findByIdAndDelete(userId);
        return ('Removed User '+user.email+' successfully.');
    } catch (error) {
        throw new Error(error);
    }
}

// module.exports = {
//   createUser,
//   findUserById,
//   findUserByEmail,
//   updateUserById,
//   deleteUserById,
//   removeUsersToken
// };