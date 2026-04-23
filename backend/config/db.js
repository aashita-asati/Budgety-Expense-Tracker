const mongoose=require("mongoose");
require ("dotenv").config();

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log("DB connected")

    }
    catch(err){
        console.log("Error connecting to DB", err);
        process.exit(l);

    }
};
module.exports=connectDB;