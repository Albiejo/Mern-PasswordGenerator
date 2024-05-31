import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {CustomError} from '../error/custom.error.js';


export const signup = async (req, res) => {
  
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new CustomError("Email already exist!", 409);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const newUser = await user.save();
    res.send({ userData: newUser });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error(`Unexpected error in signup`, error);
      res
        .status(500)
        .json({ message: "Internal Server Error. Please try again later." });
    }
  }
};

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const existingUser=await User.findOne({email:email});
        if(!existingUser){
            throw new CustomError("Invalid email address!",400)
        }else{
            const matchPassword=await bcrypt.compare(password,existingUser.password);
            if(!matchPassword){
                throw new CustomError("Invalid password",400)
            }else{
                const token=jwt.sign({_id:existingUser._id},process.env.JWT_SECRET)
                res.send({userData:existingUser,token:token})
            }
        }
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ message: error.message });
          } else {
            console.error(`Unexpected error in login`, error);
            res
              .status(500)
              .json({ message: "Internal Server Error. Please try again later." });
          }
    }
}