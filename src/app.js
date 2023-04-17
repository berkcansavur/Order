const express = require('express');
const app  = express();
const port = process.env.PORT 
app.get('',(req,res)=> {
    res.send('Order app is started')
})
app.listen(port,()=>{
    console.log('Server is up on port 3000.')
})
