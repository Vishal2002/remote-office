import { Request,Response } from "express";
import { createToken} from "../utils/jwt";
import {User} from "../models/User";

export const UserController={
    registerUser: async (req:Request, res:Response)=>{
    try {
        const {email, password,name,avatar} = req.body;
        const existingUser = await User.findOne({ email:email });
        if (existingUser) {
          res.status(109).json({message:'Email already registered'})
        }
        const user= new User({ email:email, password:password, name:name,avatar:avatar||''});
        await user.save();
        const token = createToken(user?._id,user?.role)
       return  res.status(200).json({message:"Registration successful",token:token});
    }            
     catch (error) {
        console.error(error);
        return res.status(500).json({error:"Failed to register"});
    }     
    },

   login: async (req:Request, res:Response)=>{
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
      //@ts-ignore
        const isPasswordValid = await user.comparePassword(password);
    
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const token = createToken(user._id, user.role);
    
        return res.status(200).json({
          message: 'Login successful',
          token: token,
          data: user
        }); 

    }
        
    catch (error) {
        console.error(error);
       return res.status(500).json({error:"Server Error"});
    }
   
}

}

   


