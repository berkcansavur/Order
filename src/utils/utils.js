const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {User} = require('../models/user.model');
const {WarehouseManager} = require('../models/warehousemanager.model');
const {Courier} = require('../models/courier.model');
async function authenticateLogger(root,token,logger){
    if(root==='courier'){
        const courierToBeAuthenticated = await Courier.findById(logger._id)
        const tokens = courierToBeAuthenticated.tokens.slice();
        tokens.push({token});
        courierToBeAuthenticated.tokens = tokens;
        await courierToBeAuthenticated.save();
        const responseCourier = {
            courierName:courierToBeAuthenticated.courierName,
            email:courierToBeAuthenticated.email,
            phone:courierToBeAuthenticated.phone,
            token:token
        }
        return responseCourier;
    }
    if(root==='user'){
            const userToBeAuthenticated = await User.findById(logger._id);
            const tokens = userToBeAuthenticated.tokens.slice();
            tokens.push({token});
            userToBeAuthenticated.tokens = tokens;
            await userToBeAuthenticated.save();
            const responseUser={
                name: userToBeAuthenticated.name,
                email: userToBeAuthenticated.email,
                token:token
            }
            return responseUser;
        
    }
    if(root==='warehousemanager'){
        const warehouseManagerToBeAuthenticated = await WarehouseManager.findById(logger._id.toString());
        const tokens = warehouseManagerToBeAuthenticated.tokens.slice();
        tokens.push({token});
        warehouseManagerToBeAuthenticated.tokens = tokens;
        await warehouseManagerToBeAuthenticated.save();
        const responsewarehouseManagerToBeAuthenticated={
            name: warehouseManagerToBeAuthenticated.name,
            email: warehouseManagerToBeAuthenticated.email,
            token:token
        }
        return responsewarehouseManagerToBeAuthenticated;
    
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
    if(root === 'warehousemanager'){ 
        const token = jwt.sign({warehouseManagerId: Id },process.env.JWT_SECRET);
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
    if(root==='warehousemanager'){
        const warehouseManager = await WarehouseManager.findOne({email});
        if(!warehouseManager){
            throw new Error('Unable to login');
        }
        const isMatch = await bcrypt.compare(password, warehouseManager.password);
        if(!isMatch){
            throw new Error('Unable to login');
        }
        return warehouseManager;
    }
}
module.exports = {
    generateAuthToken,
    findByCredentials,
    authenticateLogger
};