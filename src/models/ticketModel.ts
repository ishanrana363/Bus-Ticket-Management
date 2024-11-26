import mongoose, { Schema, Document } from "mongoose";

export interface ITicket extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    bus: mongoose.Schema.Types.ObjectId;
    seatNumber: number;
    bookingDate: Date;
};

const ticketSchema : Schema <ITicket> = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    seatNumber: {
        type: Number,
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    }
});

const ticketModel = mongoose.model<ITicket>("ticket",ticketSchema);

export default ticketModel;