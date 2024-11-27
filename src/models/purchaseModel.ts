import mongoose, { Schema, Document } from "mongoose";

export interface IPurchase extends Document {
    busId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    purchaseTime: Date;
}

const purchaseSchema: Schema<IPurchase> = new Schema(
    {
        busId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        purchaseTime: {
            type: Date,
            default : Date.now()
        }
    },
    {
        versionKey: false,
        timestamps: true // Automatically adds `createdAt` and `updatedAt`.
    }
);

const purchaseModel = mongoose.model<IPurchase>("Purchase", purchaseSchema);

export default purchaseModel;
