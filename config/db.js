<<<<<<< HEAD
import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log("DB connected"))
        .catch((err) => console.log(err));
};
=======
const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb+srv://shreerajmane007:passwordworkso@cluster0.luoyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('Database connected successfully')
    }
    catch(err){
        console.log(err, "error in connecting database")
    }
}

module.exports = connectDB;
>>>>>>> 668573a5f1ee6796e5eaec3d81b0b10d0d6df14f
