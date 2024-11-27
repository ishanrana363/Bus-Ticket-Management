import mongoose, { Schema, Document } from "mongoose";

export interface ITicket extends Document {
    busId: mongoose.Schema.Types.ObjectId;
    seatNumber: string;
    ticketPrice : string,
    busDeparatureTime : Date;
};

const ticketSchema : Schema <ITicket> = new Schema({
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    seatNumber: {
        type: String,
        required: true,
        unique: true
    },
    ticketPrice : {
        type: String,
        required: true
    },
    busDeparatureTime : {
        type: Date,
        required: true
    }
    
},{timestamps: true,versionKey:false});

const ticketModel = mongoose.model<ITicket>("ticket",ticketSchema);

export default ticketModel;