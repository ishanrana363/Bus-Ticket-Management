"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//  auth controller
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const busController_1 = require("../controllers/busController");
const router = express_1.default.Router();
// auth related api
router.post('/auth/register', authController_1.register);
router.post("/auth/login", authController_1.login);
router.get("/auth/logout", authMiddleware_1.isLogIn, authController_1.handleLogOut);
// bus related api
router.post("/admin/bus", authMiddleware_1.isLogIn, authMiddleware_1.isAdmin, busController_1.addBus);
router.put("/admin/bus/:id", authMiddleware_1.isLogIn, authMiddleware_1.isAdmin, busController_1.updateBus);
router.delete("/admin/bus/:id", authMiddleware_1.isLogIn, authMiddleware_1.isAdmin, busController_1.deleteBus);
exports.default = router;
// import { Request, Response } from "express";
// import { Ticket } from "../models/Ticket.model";
// // Fetch available tickets
// export const getTickets = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { busId, startTime, endTime } = req.query;
//     // Build query dynamically
//     const query: any = {};
//     if (busId) query.busId = busId;
//     if (startTime && endTime) {
//       query.departureTime = {
//         $gte: new Date(startTime as string),
//         $lte: new Date(endTime as string),
//       };
//     }
//     // Fetch tickets from the database
//     const tickets = await Ticket.find(query).populate("busId", "name route");
//     res.status(200).json({
//       success: true,
//       data: tickets,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch tickets.",
//       error: error.message,
//     });
//   }
// };
