const mongoose = require("mongoose");

const {Schema}=mongoose;
const urlSchema=new Schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true,
        unique:true
    }
});
module.exports=mongoose.model("Url",urlSchema);