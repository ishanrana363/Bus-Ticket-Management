"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenCreate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenCreate = (data, key, expiresIn) => {
    const token = jsonwebtoken_1.default.sign(data, key, { expiresIn });
    return token;
};
exports.tokenCreate = tokenCreate;
