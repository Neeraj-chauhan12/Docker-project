const mongoose=require('mongoose')
const dotenv=require('dotenv')


exports.connection=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected")
    } catch (error) {
        console.log(error);
    }
}