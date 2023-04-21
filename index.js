import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from 'dotenv';
import studentMentorRouter from './routes_studentmentor/routes.js'

dotenv.config()
const app=express();
const PORT=process.env.PORT;
//const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URI;

async function createConnection(){
    try{
        const client=new MongoClient(MONGO_URL);
        await client.connect();
        console.log("connected mongodb")
        return client;
    }catch(error){
        return error;
    }
}

export const client=await createConnection();


app.use(express.json());



app.get("/", function(req,res){
    res.send("welcome to student mentor apis ")
})

app.use('/',studentMentorRouter);


app.listen(PORT,()=>console.log(`the server started ${PORT}`))