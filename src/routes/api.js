"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//  auth controller
const authController_1 = require("../controllers/authController");
// auth midddleware
const authMiddleware_1 = require("../middlewares/authMiddleware");
// bus controller
const busController_1 = require("../controllers/busController");
// tickets controller
const ticketController_1 = require("./../controllers/ticketController");
// user controller
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// auth related api
router.post('/auth/register', authController_1.register);
router.post("/auth/login", authController_1.login);
router.get("/auth/logout", authMiddleware_1.isLogIn, authController_1.handleLogOut);
// bus related api
router.post("/admin/bus", authMiddleware_1.isLogIn, authMiddleware_1.isAdmin, busController_1.addBus);
router.put("/admin/bus/:id", authMiddleware_1.isLogIn, authMiddleware_1.isAdmin, busController_1.updateBus);
router.delete("/admin/bus/:id", authMiddleware_1.isLogIn, authMiddleware_1.isAdmin, busController_1.deleteBus);
// ticket related api
router.post("/admin/ticket", authMiddleware_1.isLogIn, authMiddleware_1.isAdmin, ticketController_1.uploadTicket);
router.put("/admin/ticket/:id", authMiddleware_1.isLogIn, authMiddleware_1.isAdmin, ticketController_1.updateTicket);
router.delete("/admin/ticket/:id", authMiddleware_1.isLogIn, authMiddleware_1.isAdmin, ticketController_1.deleteTicket);
// user related api
router.get("/buses", userController_1.allBuses);
router.get("/tickets", authMiddleware_1.isLogIn, userController_1.getTicketsBusAndTime);
exports.default = router;
