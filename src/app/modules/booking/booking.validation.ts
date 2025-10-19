import { z } from 'zod';

const createBookingZodSchema = z.object({
  body: z.object({
    trainee: z.string({
      required_error: 'Trainee ID is required',
    }),
    schedule: z.string({
      required_error: 'Schedule ID is required',
    }),
    status: z.enum(['BOOKED', 'CANCELLED', 'ATTENDED'] as [string, ...string[]], {
      required_error: 'Status is required',
    }),
  }),
});

const updateBookingStatusZodSchema = z.object({
  body: z.object({
    status: z.enum(['BOOKED', 'CANCELLED', 'ATTENDED'] as [string, ...string[]], {
      required_error: 'Status is required',
    }),
  }),
});

export const BookingValidation = {
  createBookingZodSchema,
  updateBookingStatusZodSchema,
};
