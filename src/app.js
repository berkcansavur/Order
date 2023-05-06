const express = require('express');
require('./db/mongoose');
const bodyParser = require('body-parser');
const { asClass, createContainer } = require('awilix');
const { scopePerRequest } = require('awilix-express');
const UserRouter = require('./routers/user')
const OrderRouter = require('./routers/order')
const OrderService = require('./services/order.service');
const OrderRepository = require('./repositories/order.repository');
const OrderModel = require('./models/order.model');
const app  = express();
//Parse incoming request bodies as JSON
app.use(bodyParser.json());
//Initialize Dependency Injection container
const container = createContainer();
container.register({
    Order: asClass(OrderModel).singleton(),
    OrderService: asClass(OrderService).scoped(),
    OrderRepository: asClass(OrderRepository).scoped()
});
//Bind dependency injection container to express middleware
app.use(scopePerRequest(container));
//Register routes
app.use('/api/orders',OrderRouter);

app.use(express.json());
app.use(UserRouter);
app.use(OrderRouter);
module.exports = app;