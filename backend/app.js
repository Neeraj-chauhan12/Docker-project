const express=require('express');
const dotenv=require('dotenv').config()
const {app,server}=require('./server')
const {connection}=require('./src/dbconnection/connection')




app.get("/",(req,res)=>{
    res.send("server is running")
})


//CONNECTION DB
connection()

const PORT=process.env.PORT || 5000
server.listen(PORT,()=>{
    console.log("server started at 3000");
})