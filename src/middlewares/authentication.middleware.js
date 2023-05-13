const jwt = require('jsonwebtoken');
const {container} = require('../di-setup');
const UserRepository = container.resolve('UserRepository');
const CourierRepository = container.resolve('CourierRepository');
const WarehouseManagerRepository = container.resolve('WarehouseManagerRepository');
const auth = async(req,res,next)=>{
    let root=req.path;
    try{
        if(root.toString().includes('/orders')){
            if(root.toString().includes('/assignOrder')||
            root.toString().includes('/updateStatusApproved')||
            root.toString().includes('/updateStatusDenied')||
            root.toString().includes('/updateStatusPreparingStarted')||
            root.toString().includes('/updateStatusPreparingCompleted')||
            root.toString().includes('/updateStatusOntheway')||
            root.toString().includes('/updateStatusDelivered')){
                const token = req.header('Authorization').replace('Bearer ','');
                const decoded =jwt.verify(token,process.env.JWT_SECRET);
                if(!decoded) {
                throw new Error('token can not verify');
                }
                const courier = await CourierRepository.getCourierById(decoded.courierId);
                const findedCourier = await courier.tokens.filter((tokens)=>{
                    return tokens.token ==token
                });
                if (!courier) {
                    throw new Error('Courier has not found!');
                }
                if(findedCourier.length!==0){
                    req.token = token;
                    req.courier = courier;
                    next();
                }
                if(findedCourier.length===0){
                    throw new Error('Couriers token has not found')
                }
            }
            if(root.toString().includes('/updateStatusCancelled')||root.toString().includes('/delete')){
                const token = req.header('Authorization').replace('Bearer ','');
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                if(!decoded) {
                throw new Error('token can not verify');
                }
                const user = await UserRepository.getUserById(decoded.userId);
                const findedUser = await user.tokens.filter((tokens)=>{
                    return tokens.token == token
                })
                if (!user) {
                    throw new Error('User has not found !');
                }
                if(findedUser.length!==0){
                    req.token = token;
                    req.user = user;
                    next();
                }
                if(findedUser.length===0){
                    throw new Error('Users token has not found');
                }
            
            }
            if(!root.toString().includes('orders/')){
                const token = req.header('Authorization').replace('Bearer ','');
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                if(!decoded) {
                throw new Error('token can not verify');
                }
                const user = await UserRepository.getUserById(decoded.userId);
                const findedUser = await user.tokens.filter((tokens)=>{
                    return tokens.token == token
                })
                if (!user) {
                    throw new Error('User has not found !');
                }
                if(findedUser.length!==0){
                    req.token = token;
                    req.user = user;
                    next();
                }
                if(findedUser.length===0){
                    throw new Error('Users token has not found');
                }
                
            }
            
        }
        if(root.toString().includes('/couriers')){
            const token = req.header('Authorization').replace('Bearer ','');
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            if(!decoded) {
            throw new Error('token can not verify');
            }
            const courier = await CourierRepository.getCourierById(decoded.courierId);
            const findedCourier = await courier.tokens.filter((tokens)=>{
                return tokens.token ==token
            });
            if (!courier) {
                throw new Error('Courier has not found!');
            }
            if(findedCourier.length!==0){
                req.token = token;
                req.courier = courier;
                next();
            }
            if(findedCourier.length===0){
                throw new Error('Couriers token has not found')
            }
            
        }
        if(root.toString().includes('/users')){
            const token = req.header('Authorization').replace('Bearer ','');
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            if(!decoded) {
            throw new Error('token can not verify');
            }
            const user = await UserRepository.getUserById(decoded.userId);
            const findedUser = await user.tokens.filter((tokens)=>{
                return tokens.token == token
            })
            if (!user) {
                throw new Error('User has not found !');
            }
            if(findedUser.length!==0){
                req.token = token;
                req.user = user;
                next();
            }
            if(findedUser.length===0){
                throw new Error('Users token has not found');
            }
        }
        if(root.toString().includes('/products')){
            const token = req.header('Authorization').replace('Bearer ','');
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            if(!decoded) {
            throw new Error('token can not verify');
            }
            const courier = await CourierRepository.getCourierById(decoded.courierId);
            const findedCourier = await courier.tokens.filter((tokens)=>{
                return tokens.token ==token
            });
            if (!courier) {
                throw new Error('Courier has not found!');
            }
            if(findedCourier.length!==0){
                req.token = token;
                req.courier = courier;
                next();
            }
            if(findedCourier.length===0){
                throw new Error('Couriers token has not found')
            }
        }
        if(root.toString().includes('/warehouse-manager')){
            const token = req.header('Authorization').replace('Bearer ','');
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            if(!decoded) {
            throw new Error('token can not verify');
            }
            const warehouseManager = await WarehouseManagerRepository.getWarehouseManagerById(decoded.userId);
            const findedWarehouseManager = await warehouseManager.tokens.filter((tokens)=>{
                return tokens.token == token
            })
            if (!warehouseManager) {
                throw new Error('Warehouse manager has not found !');
            }
            if(findedWarehouseManager.length!==0){
                req.token = token;
                req.warehouseManager = warehouseManager;
                next();
            }
            if(findedWarehouseManager.length===0){
                throw new Error('Warehouse managers token has not found');
            }
        }
        
    }catch (error) {
        return res.status(401).send({error: 'Unauthorized'});
    }
}
module.exports = auth