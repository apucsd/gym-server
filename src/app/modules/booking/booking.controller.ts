import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './booking.service';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';

const createBooking = catchAsync(async (req: Request, res: Response) => {
      const { ...bookingData } = req.body;
      const result = await BookingService.createBooking(bookingData);

      sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: 'Booking created successfully',
            data: result,
      });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
      const result = await BookingService.getAllBookings();

      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Bookings retrieved successfully',
            data: result,
      });
});

const getAllMyBookings = catchAsync(async (req: Request, res: Response) => {
      const result = await BookingService.getAllMyBookings((req.user as JwtPayload).id);

      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Bookings retrieved successfully',
            data: result,
      });
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
      const { id } = req.params;
      const result = await BookingService.updateBookingStatus(id, req.body.status);

      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Booking status updated successfully',
            data: result,
      });
});



export const BookingController = {
      createBooking,
      getAllBookings,
      getAllMyBookings,
      updateBookingStatus,
};
