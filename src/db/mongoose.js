const mongoose = require('mongoose');
const{required}= require('yargs');
const validator = require('validator');
mongoose.connect('mongodb://127.0.0.1:27017/order-api',{
    useNewUrlParser: true,
})