import mongoose, {Schema,Document} from "mongoose";

export interface Ibus extends Document {
    busName : string;
    seats : number;
    route : string[];
    departureTime : Date;
};


const busSchema : Schema <Ibus> = new Schema({
    busName : {
        type : String,
        required : true,
        unique : true
    },
    seats : {
        type : Number,
        required : true
    },
    route : {
        type : [String],
        required : true
    },
    departureTime : {
        type : Date,
        required : true
    }
});

const busModel = mongoose.model<Ibus>("bus",busSchema);

export default busModel;