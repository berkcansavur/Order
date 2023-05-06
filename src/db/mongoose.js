const mongoose = require('mongoose');
const{required}= require('yargs');
 mongoose.connect('mongodb://127.0.0.1:27017/order-api',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(()=>console.log('Mongo DB Connection established')).catch((error)=>console.log(error));