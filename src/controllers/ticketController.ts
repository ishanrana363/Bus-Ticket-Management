
import ticketModel from "../models/ticketModel";


export const uploadTicket = async (req: any, res: any) => {
    const reqBody = req.body;
    const {seatNumber} = req.body;
    try {
        const role = req.headers.role;

        const ticketData = await ticketModel.findOne({seatNumber:seatNumber});

        if(ticketData){
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
        let data = await ticketModel.create(reqBody);
        res.status(201).json({
            meg: "Ticket added successfully",
            data: data
        });
    } catch (error: any) {
        return res.status(500).json({
            status: "fail",
            msg: error.toString(),
        })
    }
};

export const updateTicket = async (req: any, res: any) => {
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
        let data = await ticketModel.findByIdAndUpdate(id, reqBody, { new: true });
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
    } catch (error: any) {
        return res.status(500).json({
            status: "fail",
            msg: error.toString(),
        })
    }
};


export const deleteTicket = async (req: any, res: any) => {
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
        const data = await ticketModel.findByIdAndDelete(id);

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
    } catch (error: any) {
        return res.status(500).json({
            status: 'fail',
            msg: error.toString(),
        });
    }
};