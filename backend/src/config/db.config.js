import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();  
const connectDB = async () => {
    try {      
        const connect = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'passwordGenerator'  
        });

        console.log(`Using Database: ${connect.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
