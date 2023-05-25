const mongoose = require('mongoose');
module.exports = class Database{
    constructor(){
        this.connection= null;
    }
    static getInstance(){
        if(!Database.instance){
            Database.instance= new Database();
        }
        return Database.instance;
    }
    connect(){
        mongoose.connect('mongodb://127.0.0.1:27017/order-api',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(()=>console.log('Mongo DB Connection established')).catch((error)=>console.log(error));
    }
}