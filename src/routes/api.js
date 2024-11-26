"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//  auth controller
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// auth related api
router.post('/register', authController_1.register);
exports.default = router;
