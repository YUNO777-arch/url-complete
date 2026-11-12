const express = require('express');
const app = express();
const cors = require("cors");
const connectDB=require("./db.js")
const Url=require("./models/Url.js")
require("dotenv").config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;
const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
async function generatecode(){    
    let code = "";
    for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * 62);
        code += chars[index];
    }
    if(await Url.findOne({shortUrl:code})){
        return await generatecode();
    }
    return code;
}
app.get("/:shortcode",async function(req,res){
    const {shortcode}=req.params;
    try{
    const url=await Url.findOne({shortUrl:shortcode});
    if(!url){
        return res.status(404).json({error:"URL not found"});
    }
    res.redirect(url.originalUrl);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
} )
app.post("/api/shorturl",async (req,res)=>{
    const {originalUrl} = req.body;
    try {
        // console.log("we reaxhed here");
        let a=typeof (originalUrl);
        console.log("Type of originalUrl:", a);
        if(!originalUrl){
            return res.status(400).json(
                {error:"originalUrl is required"}
            );
        }
        if(typeof (originalUrl)!=="string"){
            return res.status(400).json(
                {error:"originalUrl must be a string"}
            );
        }
        const url = await Url.create({
            originalUrl: originalUrl,
            shortUrl: await generatecode(),
        });
       const response ={
        Shorturl:"http://localhost:"+port+"/"+url.shortUrl
       }
       res.status(201).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
async function startServer(){
    try{
        await connectDB();
        console.log("Connected to database");
          app.listen(port,"0.0.0.0", () => {
          console.log(`Server is running on port ${port}`);
        })
    }catch(err){
        console.log(err);
    }
}

startServer();
// createUrl();