import bcrypt from "bcryptjs";
import userModel from "../models/userModel"


export const register = async (req:any,res:any)=>{
    const {name,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Check if user already exists
        const userEmail = await userModel.findOne({email:email});
        if(userEmail) return res.status(400).json({
            status:'fail',
            msg : 'User already exists',
        })
        const user = await userModel.create({name:name,email:email,password:hashedPassword});
        return res.status(201).json({
            status:'success',
            data : user,
        })
    } catch (error:any) {
        return res.status(500).json({
            status:'fail',
            msg : error.message,
        })
    }
}