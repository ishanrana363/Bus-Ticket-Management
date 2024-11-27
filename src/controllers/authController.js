"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogOut = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const tokenHelper_1 = require("../helper/tokenHelper");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    try {
        // Check if user already exists
        const userEmail = yield userModel_1.default.findOne({ email: email });
        if (userEmail)
            return res.status(400).json({
                status: 'fail',
                msg: 'User already exists',
            });
        const user = yield userModel_1.default.create({ name: name, email: email, password: hashedPassword });
        return res.status(201).json({
            status: 'success',
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 'fail',
            msg: error.message,
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let reqBody = req.body;
        const { email, password } = reqBody;
        const user = yield userModel_1.default.findOne({ email: email });
        if (!user) {
            return res.status(404).send({
                status: "fail",
                message: "User not found"
            });
        }
        let matchPassword = bcryptjs_1.default.compare(password, user.password);
        if (!matchPassword) {
            return res.status(403).json({
                status: "fail",
                msg: "password not match",
            });
        }
        const key = process.env.JWTKEY;
        const token = (0, tokenHelper_1.tokenCreate)({ user }, key, "10d");
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
    }
    catch (error) {
        return res.status(500).send({
            status: "fail",
            message: error.toString()
        });
    }
});
exports.login = login;
const handleLogOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("accessToken");
        return res.status(200).json({
            status: "success",
            msg: "User logout successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: error.toString(),
        });
    }
});
exports.handleLogOut = handleLogOut;
