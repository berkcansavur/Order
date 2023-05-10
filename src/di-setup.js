const awilix = require('awilix');
const mongoose = require('mongoose');
const UserController = require('./controllers/user.controller');
const UserService = require('./services/user.service');
const OrderController = require('./controllers/order.controller');
const OrderService = require('./services/order.service');
const OrderRepository = require('./repositories/order.repository');
const UserRepository = require('./repositories/user.repository');
const {UserSchema}= require('./models/user.model');
const container = awilix.createContainer();

function setup(){
    container.register({
        mongoose:awilix.asValue(mongoose),
        UserSchema:awilix.asValue(UserSchema),
        UserController: awilix.asClass(UserController),
        OrderController: awilix.asClass(OrderController),
        UserService: awilix.asClass(UserService),
        OrderService: awilix.asClass(OrderService),
        UserRepository: awilix.asClass(UserRepository),
        OrderRepository: awilix.asClass(OrderRepository)
        
    });
}
module.exports = {container,setup};