
import busModel from "../models/busModel";
export const addBus = async (req:any, res:any) => {
    const { busName, totalSeats, route, departureTime } = req.body;
    try {
        let data = await busModel.create({busName: busName,totalSeats:totalSeats, route: route, departureTime: departureTime});
        res.status(201).json({
            meg: "Bus added successfully",
            data: data
        });
    } catch (error:any) {
        return res.status(500).json({
            status:"fail",
            msg : error.toString(),
        })
    }
};

export const updateBus = async (req:any, res:any) => {
    const { id } = req.params;
    const { busName, totalSeats, route, departureTime } = req.body;
    try {
        let data = await busModel.findByIdAndUpdate(id, { busName: busName, totalSeats:totalSeats, route: route, departureTime: departureTime }, {new: true});
        res.status(200).json({
            msg: "Bus updated successfully",
            data: data
        });
    } catch (error:any) {
        return res.status(500).json({
            status:"fail",
            msg : error.toString(),
        })
    }
};