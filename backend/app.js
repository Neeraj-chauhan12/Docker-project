const express=require('express');
const {app,server}=require('./server')




const PORT=process.env.PORT || 5000
server.listen(PORT,()=>{
    console.log("server started at 3000");
})