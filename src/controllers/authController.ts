import bcrypt from "bcryptjs";
import userModel from "../models/userModel"
import { tokenCreate } from "../helper/tokenHelper";


export const register = async (req: any, res: any) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Check if user already exists
        const userEmail = await userModel.findOne({ email: email });
        if (userEmail) return res.status(400).json({
            status: 'fail',
            msg: 'User already exists',
        })
        const user = await userModel.create({ name: name, email: email, password: hashedPassword });
        return res.status(201).json({
            status: 'success',
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

        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(404).send({
                status: "fail",
                message: "User not found"
            });
        }
        let matchPassword = bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(403).json({
                status: "fail",
                msg: "password not match",
            });
        }
        const key: any = process.env.JWTKEY;
        const token = tokenCreate({ user }, key, "10d");
        res.cookie("accessToken", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        return res.status(200).json({
            status: "success",
            token: token,
        });
    } catch (error: any) {
        return res.status(500).send({
            status: "fail",
            message: error.toString()
        })
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