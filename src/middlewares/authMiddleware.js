"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isLogOut = exports.isLogIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accessTokenKey = process.env.JWTKEY || "";
// Middleware to check if the user is logged in
const isLogIn = (req, res, next) => {
    var _a;
    try {
        let token = req.headers.authorization;
        if (!token) {
            token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
        }
        if (!token) {
            res.status(401).json({
                status: "fail",
                msg: "Unauthorized user",
            });
            return;
        }
        // Verify the token
        const decode = jsonwebtoken_1.default.verify(token, accessTokenKey);
        if (!decode) {
            res.status(401).json({
                status: "fail",
                msg: "Invalid token, please log in",
            });
            return;
        }
        req.headers._id = decode.user._id;
        req.headers.email = decode.user.email;
        req.headers.role = decode.user.role;
        next();
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            msg: error.message,
        });
    }
};
exports.isLogIn = isLogIn;
// Middleware to check if the user is logged out
const isLogOut = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            const decode = jsonwebtoken_1.default.verify(token, accessTokenKey);
            if (decode) {
                res.status(409).json({
                    status: "fail",
                    msg: "You have already logged in",
                });
                return;
            }
            else {
                res.status(401).json({
                    status: "fail",
                    msg: "User token expired",
                });
                return;
            }
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            status: "fail",
            msg: error.toString(),
        });
    }
};
exports.isLogOut = isLogOut;
// Middleware to check if the user has admin privileges
const isAdmin = (req, res, next) => {
    try {
        const role = req.headers.role;
        if (role !== "admin") {
            res.status(403).json({
                status: "fail",
                msg: "You do not have permission",
            });
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            status: "fail",
            msg: error.toString(),
        });
    }
};
exports.isAdmin = isAdmin;
