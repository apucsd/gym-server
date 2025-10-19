import { Document, Types } from "mongoose";

export interface IBooking extends Document {
  trainee: Types.ObjectId;
  schedule: Types.ObjectId;
  status: "BOOKED" | "CANCELLED" | "ATTENDED";
  bookedAt: Date;
}
