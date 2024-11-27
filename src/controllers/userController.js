"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketsBusAndTime = exports.allBuses = void 0;
const busModel_1 = __importDefault(require("../models/busModel"));
const ticketModel_1 = __importDefault(require("../models/ticketModel"));
const allBuses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const buses = yield busModel_1.default.find();
        res.status(200).json({
            status: "success",
            data: buses,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "fail",
            msg: error.toString(),
        });
    }
});
exports.allBuses = allBuses;
// Fetch available tickets
const getTicketsBusAndTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { busId, startTime, endTime } = req.body;
        // Build query dynamically
        const query = {};
        if (busId)
            query.busId = busId;
        if (startTime && endTime) {
            query.busDeparatureTime = {
                $gte: new Date(startTime),
                $lte: new Date(endTime),
            };
        }
        // Fetch tickets from the database
        const tickets = yield ticketModel_1.default.find(query);
        res.status(200).json({
            success: true,
            data: tickets,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch tickets.",
            error: error.message,
        });
    }
});
exports.getTicketsBusAndTime = getTicketsBusAndTime;
