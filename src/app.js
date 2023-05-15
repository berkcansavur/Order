const express = require('express');
require('./db/mongoose');
const bodyParser = require('body-parser');
const {setup} = require('../src/di-setup');
setup();
//Import Routers
const UserRouter = require('./routes/user.router');
const CourierRouter = require('./routes/courier.router');
const OrderRouter = require('./routes/order.router');
const ProductRouter = require('./routes/product.router');
const WareHouseManagerRouter = require('./routes/warehousemanager.router');
const ManagementRouter = require('./routes/management.router');
const WarehouseRouter =require('./routes/warehouse.router');
//express application
const app  = express();
//Parse incoming request bodies as JSON
app.use(bodyParser.json());
app.use(express.json());
//Use Routers
app.use(UserRouter);
app.use(OrderRouter);
app.use(CourierRouter);
app.use(ProductRouter);
app.use(WareHouseManagerRouter);
app.use(ManagementRouter);
app.use(WarehouseRouter);

module.exports = app;