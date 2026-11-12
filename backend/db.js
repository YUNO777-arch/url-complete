const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
    try{
        console.log(process.env.local_host)
        await mongoose.connect(process.env.local_host);
    }
    catch(err){
        console.log("Error connecting to database",err)
        throw err;
    }
}
module.exports = connectDB;