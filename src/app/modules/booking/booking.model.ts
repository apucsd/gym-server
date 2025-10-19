import { Schema, model } from 'mongoose';
import { IBooking } from './booking.interface';

const bookingSchema = new Schema<IBooking>(
  {
    trainee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    schedule: {
      type: Schema.Types.ObjectId,
      ref: 'Schedule',
      required: true,
    },
    status: {
      type: String,
      enum: ['BOOKED', 'CANCELLED', 'ATTENDED'],
      default: 'BOOKED',
    },
    bookedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Booking = model<IBooking>('Booking', bookingSchema);
