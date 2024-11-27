import rateLimit from "express-rate-limit";
import hpp from "hpp";
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
const app = express();
import connectDB from './db';
import router from "./src/routes/api";
import cookieParser from "cookie-parser";



app.use(express.json());
app.use(hpp());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser());

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes.",
});

app.use(apiLimiter);

// database connect

connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
});


app.use('/api/v1', router);



export default app;