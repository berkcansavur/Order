const express = require('express');
require('./db/mongoose');
const app  = express();
//Routers
const userRouter = require('./routers/user');
const orderRouter = require('./routers/order');
const courierRouter = require('./routers/courier');
app.use(express.json());
app.use(userRouter);
app.use(orderRouter);
app.use(courierRouter);
module.exports = app;