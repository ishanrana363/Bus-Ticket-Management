import bcrypt from "bcryptjs";
import userModel from "../models/userModel"
import { tokenCreate } from "../helper/tokenHelper";


export const register = async (req: any, res: any) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Check if user already exists
        const userEmail = await userModel.findOne({ email: email });
        if (userEmail) return res.status(409).json({
            status: 'fail',
            msg: 'User email already exists',
        })
        const user = await userModel.create({ name: name, email: email, password: hashedPassword });
        return res.status(201).json({
            status: 'success',
            msg: "User created successfully",
            data: user,
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 'fail',
            msg: error.message,
        })
    }
}

export const login = async (req: any, res: any) => {
    try {
        let reqBody = req.body;
        const { email, password } = reqBody;

        // Find user by email
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).send({
                status: "fail",
                message: "User not found"
            });
        }

        // Check if the password matches
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(403).json({
                status: "fail",
                msg: "Password does not match",
            });
        }

        // Generate JWT token
        const key: any = process.env.JWTKEY;
        const token = tokenCreate({ user }, key, "10d");

        // Set JWT token in cookies
        res.cookie("accessToken", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,  // 1 week
            httpOnly: true,
            secure: true,                      // Only send cookies over HTTPS
            sameSite: "none",                  // Allow cross-origin requests
        });

        // Send successful response
        return res.status(200).json({
            status: "success",
            msg: "User logged in successfully",
            token: token,
        });
    } catch (error: any) {
        console.error(error);  // Log the error for debugging
        return res.status(500).send({
            status: "fail",
            msg: "Internal server error"
        });
    }
};

export const handleLogOut = async (req: any, res: any) => {
    try {
        res.clearCookie("accessToken");
        return res.status(200).json({
            status: "success",
            msg: "User logout successfully",
        });
    } catch (error: any) {
        return res.status(500).json({
            status: "fail",
            msg: error.toString(),
        });
    }
};