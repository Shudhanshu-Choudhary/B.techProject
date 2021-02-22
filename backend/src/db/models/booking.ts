import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";
import { ECarType } from "../../constants/constants";

export interface IBooking extends Document {
    id: string,
    carType: ECarType,
    pickupLocation: string,
    pickupTime: string,
    dropOffLocation: string,
    userId: string,
    numberOfPassengers: number,
    luggageCount: number
}

const bookingSchema: Schema = new Schema({
  carType: {
    type: String,
    enum: ECarType,
    default: "suv"
  },
  pickupLocation: { type: String },
  pickupTime: { type: String },
  dropOffLocation: { type: String },
  numberOfPassengers: { type: Number },
  userId: { type: String },
  luggageCount: { type: Number }
}, { timestamps: true });

export default mongoose.model<IBooking>("Booking", bookingSchema);
