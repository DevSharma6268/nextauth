import mongoose from "mongoose";

export async function connect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log("connected to the database");
        })

        connection.on('error',(err)=>{
            console.log('mongodb connectionn error,please make sure MongoDB is running',err);
            process.exit();
        })

    } catch(error){
        console.log("error connecting to the data base",error);
        console.log(error);
    }
}