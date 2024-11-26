import express from 'express';
//  auth controller
import {register} from "../controllers/authController";

const router = express.Router();

// auth related api

router.post('/register', register);

export default router;