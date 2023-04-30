const express = require('express');
require('./db/mongoose');
const app  = express();
const userRouter = require('./routers/user');
const orderRouter = require('./routers/order');
app.use(express.json());
app.use(userRouter);
app.use(orderRouter);
module.exports = app;