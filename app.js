"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const hpp_1 = __importDefault(require("hpp"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const db_1 = __importDefault(require("./db"));
const api_1 = __importDefault(require("./src/routes/api"));
app.use(express_1.default.json());
app.use((0, hpp_1.default)());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes.",
});
app.use(apiLimiter);
// database connect
(0, db_1.default)();
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use('/api/v1', api_1.default);
exports.default = app;
