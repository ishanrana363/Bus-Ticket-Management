import mongoose, { Schema, Document } from "mongoose";

export interface Iuser extends Document{
    name: string;
    email: string;
    password: string;
    role: "admin" | "user"
}


const userSchema : Schema <Iuser> = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ["admin", "user"],
    },
},{timestamps: true,versionKey:false});

const userModel = mongoose.model<Iuser>("users", userSchema);
export default userModel;