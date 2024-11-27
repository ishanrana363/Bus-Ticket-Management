import busModel from "../models/busModel";
import ticketModel from "../models/ticketModel";

export const allBuses = async (req: any, res: any) => {
    try {
        const buses = await busModel.find();
        res.status(200).json({
            status: "success",
            data: buses,
        });
    } catch (error: any) {
        res.status(500).json({
            status: "fail",
            msg: error.toString(),
        });
    }
};


// Fetch available tickets
export const getTicketsBusAndTime = async (req: any, res: any) => {
    try {
        const { busId, startTime, endTime } = req.body;

        // Build query dynamically
        const query: any = {};
        if (busId) query.busId = busId;
        if (startTime && endTime) {
            query.busDeparatureTime = {
                $gte: new Date(startTime as string),
                $lte: new Date(endTime as string),
            };
        }

        // Fetch tickets from the database
        const tickets = await ticketModel.find(query);

        res.status(200).json({
            success: true,
            data: tickets,
        });
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch tickets.",
            error: error.message,
        });
    }
};
