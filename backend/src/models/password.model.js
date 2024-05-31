import mongoose from 'mongoose';

const passwordSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
       
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Password", passwordSchema);