import express from 'express';
//  auth controller
import {login, register,handleLogOut} from "../controllers/authController";
// auth midddleware
import { isAdmin, isLogIn, isLogOut } from '../middlewares/authMiddleware';
// bus controller
import { addBus, deleteBus, updateBus } from '../controllers/busController';
// tickets controller
import { deleteTicket, updateTicket, uploadTicket } from './../controllers/ticketController';
// user controller
import { allBuses, getTicketsBusAndTime, ticketPurchase } from '../controllers/userController';


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
router.delete("/admin/ticket/:id",isLogIn,isAdmin,deleteTicket);

// user related api

router.get("/buses" , allBuses );
router.get("/tickets", isLogIn, getTicketsBusAndTime);
router.post("/tickets/purchase" , isLogIn, ticketPurchase);

export default router;


