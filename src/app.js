const express = require('express');
require('./db/mongoose');
const bodyParser = require('body-parser');
const {setup} = require('../src/di-setup');
setup();
const UserRouter = require('./routes/user.router');
const CourierRouter = require('./routes/courier.router');
const OrderRouter = require('./routes/order.router');
const app  = express();
//Parse incoming request bodies as JSON
app.use(bodyParser.json());
app.use(express.json());

app.use(UserRouter);
app.use(OrderRouter);
app.use(CourierRouter);

module.exports = app;