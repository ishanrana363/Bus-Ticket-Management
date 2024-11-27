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
exports.updateBus = exports.addBus = void 0;
const busModel_1 = __importDefault(require("../models/busModel"));
const addBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { busName, totalSeats, route, departureTime } = req.body;
    try {
        let data = yield busModel_1.default.create({ busName: busName, totalSeats: totalSeats, route: route, departureTime: departureTime });
        res.status(201).json({
            meg: "Bus added successfully",
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
exports.addBus = addBus;
const updateBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { busName, totalSeats, route, departureTime } = req.body;
    try {
        let data = yield busModel_1.default.findByIdAndUpdate(id, { busName: busName, totalSeats: totalSeats, route: route, departureTime: departureTime }, { new: true });
        res.status(200).json({
            msg: "Bus updated successfully",
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
exports.updateBus = updateBus;
