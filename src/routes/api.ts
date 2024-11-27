import express from 'express';
//  auth controller
import {login, register,handleLogOut} from "../controllers/authController";
// auth midddleware
import { isAdmin, isLogIn, isLogOut } from '../middlewares/authMiddleware';
// bus controller
import { addBus, deleteBus, updateBus } from '../controllers/busController';

// tickets controller

import { updateTicket, uploadTicket } from './../controllers/ticketController';


const router = express.Router();

// auth related api

router.post('/auth/register', register);
router.post("/auth/login", login );
router.get("/auth/logout", isLogIn,handleLogOut );

// bus related api

router.post("/admin/bus",isLogIn,isAdmin,addBus );
router.put("/admin/bus/:id", isLogIn,isAdmin,updateBus );
router.delete("/admin/bus/:id",isLogIn,isAdmin,deleteBus);

// ticket related api

router.post("/admin/ticket", isLogIn,isAdmin,uploadTicket );
router.put("/admin/ticket/:id", isLogIn,isAdmin,updateTicket );

export default router;


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
