const express = require('express');
require('./db/mongoose');
const bodyParser = require('body-parser');
const { asClass, createContainer,asValue } = require('awilix');
const mongoose = require('mongoose');
const { scopePerRequest } = require('awilix-express');
const UserRouter = require('./routers/user');
const UserService = require('./services/user.service');
const UserModel = require('./models/user.model');
const UserRepository = require('./repositories/user.repository');
const OrderRouter = require('./routers/order');
const OrderService = require('./services/order.service');
const OrderRepository = require('./repositories/order.repository');
const OrderModel = require('./models/order.model');
const app  = express();
//Parse incoming request bodies as JSON
app.use(bodyParser.json());
//Initialize Dependency Injection container
const container = createContainer();
container.register({
    User: asClass(UserModel),
    UserService: asClass(UserService),
    UserRepository: asClass(UserRepository)
})
container.register({
    Order: asClass(OrderModel),
    OrderService: asClass(OrderService),
    OrderRepository: asClass(OrderRepository)
});
//Bind dependency injection container to express middleware
app.use(scopePerRequest(container));
//Register routes
app.use('/api/orders',OrderRouter);

app.use(express.json());
app.use(UserRouter);
app.use(OrderRouter);
module.exports = app;