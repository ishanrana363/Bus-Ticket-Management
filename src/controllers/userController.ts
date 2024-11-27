import busModel from "../models/busModel";
import ticketModel from "../models/ticketModel";
import purchaseModel from "../models/purchaseModel";

export const allBuses = async (req: any, res: any) => {
    try {
        const buses = await busModel.find();
        res.status(200).json({
            status: "success",
            msg : "fetch all buses",
            data: buses,
        });
    } catch (error: any) {
        res.status(500).json({
            status: "fail",
            msg: error.toString(),
        });
    }
};


export const getTicketsBusAndTime = async (req: any, res: any) => {
    try {
        const { busId, startTime, endTime } = req.body;

        if(!busId || !startTime || !endTime){
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // Build query dynamically
        const query: any = {};
        if (busId) query.busId = busId;
        if (startTime && endTime) {
            query.busDeparatureTime = {
                $gte: new Date(startTime),
                $lte: new Date(endTime),
            };
        }

        // Fetch tickets from the database
        const tickets = await ticketModel.find(query);

        if (tickets.length === 0) {
            return res.status(404).json({
                status: "fail",
                msg: "No tickets found for the provided bus ID and time range.",
            });
        }

        return res.status(200).json({
            status: "success",
            msg : "find tickets successfully",
            data: tickets,
        });
    } catch (error: any) {
        return res.status(500).json({
            status: "fail",
            msg: "An error occurred while fetching tickets.",
            error: error.message,
        });
    }
};

export const ticketPurchase = async (req: any, res: any) => {
    const id = req.headers._id;
    console.log(id)
    try {
        const { busId, startTime, endTime,purchaseTime } = req.body;

        if(!busId || !startTime || !endTime){
            return res.status(400).json({
                success: false,
                message: "bus name, start time end time  fields are required.",
            });
        }

        // Build query dynamically
        const query: any = {};
        if (busId) query.busId = busId;
        if (startTime && endTime) {
            query.busDeparatureTime = {
                $gte: new Date(startTime),
                $lte: new Date(endTime),
            };
        }

        // Fetch tickets from the database
        const tickets = await ticketModel.find(query);

        if (tickets.length === 0) {
            return res.status(404).json({
                status: "fail",
                msg: "No tickets found for the provided bus ID and time range.",
            });
        }

        if(tickets){
            let data = await purchaseModel.create({busId,userId:id,purchaseTime});
            return res.status(201).json({
                status: "success",
                msg : "ticket purchase successful",
                data: data,
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            status: "fail",
            msg: error.message,
        });
    }
};