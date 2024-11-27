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
exports.deleteTicket = exports.updateTicket = exports.uploadTicket = void 0;
const ticketModel_1 = __importDefault(require("../models/ticketModel"));
const uploadTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    const { seatNumber } = req.body;
    try {
        const role = req.headers.role;
        const ticketData = yield ticketModel_1.default.findOne({ seatNumber: seatNumber });
        if (ticketData) {
            return res.status(409).json({
                status: 'fail',
                msg: 'Ticket with the given seat number already exists'
            });
        }
        // Check if the role is admin
        if (role !== 'admin') {
            return res.status(403).json({
                status: 'fail',
                msg: 'You do not have permission to upload tickets'
            });
        }
        let data = yield ticketModel_1.default.create(reqBody);
        res.status(201).json({
            meg: "Ticket added successfully",
            data: data
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: error.toString(),
        });
    }
});
exports.uploadTicket = uploadTicket;
const updateTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const reqBody = req.body;
    try {
        const role = req.headers.role;
        // Check if the role is admin
        if (role !== 'admin') {
            return res.status(403).json({
                status: 'fail',
                msg: 'You do not have permission to update a ticket'
            });
        }
        let data = yield ticketModel_1.default.findByIdAndUpdate(id, reqBody, { new: true });
        if (!data) {
            return res.status(404).json({
                status: 'fail',
                msg: 'ticket not found',
            });
        }
        res.status(200).json({
            msg: "ticket updated successfully",
            data: data
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: error.toString(),
        });
    }
});
exports.updateTicket = updateTicket;
const deleteTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const role = req.headers.role;
    // Check if the role is admin
    if (role !== 'admin') {
        return res.status(403).json({
            status: 'fail',
            msg: 'You do not have permission to delete a ticket'
        });
    }
    try {
        const data = yield ticketModel_1.default.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({
                status: 'fail',
                msg: 'Ticket not found',
            });
        }
        res.status(200).json({
            msg: 'Ticket deleted successfully',
            data: data
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 'fail',
            msg: error.toString(),
        });
    }
});
exports.deleteTicket = deleteTicket;
