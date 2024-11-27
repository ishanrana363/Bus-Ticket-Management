import mongoose, { Schema, Document } from "mongoose";

export interface ITicket extends Document {
    busId: mongoose.Schema.Types.ObjectId;
    seatNumber: string;
    ticketPrice : string
};

const ticketSchema : Schema <ITicket> = new Schema({
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    seatNumber: {
        type: String,
        required: true
    },
    ticketPrice : {
        type: String,
        required: true
    }
    
});

const ticketModel = mongoose.model<ITicket>("ticket",ticketSchema);

export default ticketModel;