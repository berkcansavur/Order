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
async function findUser(id){
    return await User.findById(id);
}
module.exports = {
    createUser,
    findUser
};
