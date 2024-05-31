import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();  
const connectDB = async () => {
    try {
        
        console.log('MONGODB_URI:', process.env.MONGODB_URI);
        
        
        const connect = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'passwordGenerator'  
        });

       
        console.log(`MongoDB Connected: ${connect.connection.host}`);
        console.log(`Using Database: ${connect.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
