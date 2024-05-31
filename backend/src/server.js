import express from "express"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from "./config/db.config.js"
import userRoutes from "./routes/user.route.js"
import passwordRoutes from './routes/password.route.js'
import cors from 'cors'

dotenv.config()
const port=process.env.PORT || 3000;

connectDB();

const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:true,
    credentials:true
  }));


app.use("/api/user",userRoutes);
app.use("/api/password",passwordRoutes)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})