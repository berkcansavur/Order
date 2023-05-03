const Courier = require('../models/courier');
const Utils = require('../utils/utils');
async function createCourier(req){
    const courier = new Courier(req);
    await courier.save();
    const token = await Utils.generateAuthToken('courier',courier._id);
    const returnObject ={
        courier,
        token
    }
    try {
        return returnObject;
    } catch (error) {
        throw new Error(error);
    }
}
async function loginCourier(email,password){
    try {
        const courier = await Utils.findByCredentials('courier',email,password);
        const token = await Utils.generateAuthToken('courier',courier._id);
        const loggedCourier = await Utils.authenticateLogger('courier',token,courier);
        const returnCourier = {
            courier:loggedCourier,
            token:token
        }
        return returnCourier;
    } catch (error) {
        throw new Error(error);
    }    
}
async function deleteCourier(courierId){
    try {
        const courier = await Courier.findOneAndRemove(courierId);
        return ('Removed Courier '+courier.email+' successfully.');    
    } catch (error) {
        throw new Error(error);
    }
}
module.exports={
    createCourier,
    loginCourier,
    deleteCourier
}