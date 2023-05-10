const awilix = require('awilix');
const mongoose = require('mongoose');
//User Dependencies
const {UserSchema} = require('./models/user.model');
const UserRepository = require('./repositories/user.repository');
const UserService = require('./services/user.service');
const UserController = require('./controllers/user.controller');
// Order Dependencies
const {OrderSchema} = require('./models/order.model');
const OrderRepository = require('./repositories/order.repository');
const OrderService = require('./services/order.service');
const OrderController = require('./controllers/order.controller');
// Courier Dependencies
const {CourierSchema} = require('./models/courier.model');
const CourierRepository = require('./repositories/courier.repository');
const CourierService = require('./services/courier.service');
const CourierController = require('/controllers/courier.controller');


const container = awilix.createContainer();

function setup(){
    container.register({
        mongoose:awilix.asValue(mongoose),
        
        UserSchema:awilix.asValue(UserSchema),
        UserRepository: awilix.asClass(UserRepository),
        UserService: awilix.asClass(UserService),
        UserController: awilix.asClass(UserController),
        
        OrderSchema:awilix.asValue(OrderSchema),
        OrderRepository: awilix.asClass(OrderRepository),        
        OrderService: awilix.asClass(OrderService),
        OrderController: awilix.asClass(OrderController),
        
        CourierSchema: awilix.asValue(CourierSchema),
        CourierRepository: awilix.asClass(CourierRepository),
        CourierService: awilix.asClass(CourierService),
        CourierController: awilix.asClass(CourierController),
        
        
    });
}
module.exports = {container,setup};