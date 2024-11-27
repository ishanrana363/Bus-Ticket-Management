
import busModel from "../models/busModel";
export const addBus = async (req: any, res: any) => {
    const { busName, totalSeats, route, departureTime } = req.body;
    try {
        const role = req.headers.role;

        const busNameData = await busModel.findOne({busName: busName});
        if(busNameData){
            return res.status(409).json({
                status: 'fail',
                msg: 'Bus name already exists'
            });
        }

        // Check if the role is admin
        if (role !== 'admin') {
            return res.status(403).json({
                status: 'fail',
                msg: 'You do not have permission to add a bus'
            });
        }
        let data = await busModel.create({ busName: busName, totalSeats: totalSeats, route: route, departureTime: departureTime });
        res.status(201).json({
            status:"success",   
            msg: "Bus added successfully",
            data: data
        });
    } catch (error: any) {
        return res.status(500).json({
            status: "fail",
            msg: error.toString(),
        })
    }
};

export const updateBus = async (req: any, res: any) => {
    const { id } = req.params;
    const { busName, totalSeats, route, departureTime } = req.body;
    try {
        const role = req.headers.role;

        // Check if the role is admin
        if (role !== 'admin') {
            return res.status(403).json({
                status: 'fail',
                msg: 'You do not have permission to update a bus'
            });
        }
        let data = await busModel.findByIdAndUpdate(id, { busName: busName, totalSeats: totalSeats, route: route, departureTime: departureTime }, { new: true });
        if (!data) {
            return res.status(404).json({
                status: 'fail',
                msg: 'Bus not found',
            });
        }
        res.status(200).json({
            status:"success",
            msg: "Bus updated successfully",
            data: data
        });
    } catch (error: any) {
        return res.status(500).json({
            status: "fail",
            msg: error.toString(),
        })
    }
};

export const deleteBus = async (req: any, res: any) => {
    const { id } = req.params;
    const role = req.headers.role;

    // Check if the role is admin
    if (role !== 'admin') {
        return res.status(403).json({
            status: 'fail',
            msg: 'You do not have permission to delete a bus'
        });
    }

    try {
        // Perform the deletion query
        const data = await busModel.findByIdAndDelete(id);

        // If no bus is found with the given ID, return an error
        if (!data) {
            return res.status(404).json({
                status: 'fail',
                msg: 'Bus not found',
            });
        }

        // Return success response
        res.status(200).json({
            status:"success",
            msg: 'Bus deleted successfully',
            data: data
        });
    } catch (error: any) {
        // Catch and handle any errors that may occur
        return res.status(500).json({
            status: 'fail',
            msg: error.toString(),
        });
    }
};