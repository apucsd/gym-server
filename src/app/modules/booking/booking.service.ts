import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';
import { ScheduleModel } from '../schedule/schedule.model';
const createBooking = async (bookingData: IBooking): Promise<IBooking> => {
      // Check schedule exists
      const schedule = await ScheduleModel.findById(bookingData.schedule);
      if (!schedule) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Schedule not found');
      }

      // Check if class already full
      const bookingCount = await Booking.countDocuments({
            schedule: bookingData.schedule,
            status: 'BOOKED',
      });
      if (bookingCount >= 10) {
            throw new ApiError(
                  StatusCodes.BAD_REQUEST,
                  'Class schedule is full. Maximum 10 trainees allowed per schedule.',
            );
      }

      // Check if already booked this schedule
      const alreadyBooked = await Booking.findOne({
            trainee: bookingData.trainee,
            schedule: bookingData.schedule,
      });
      if (alreadyBooked) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'You have already booked this schedule.');
      }

      // ✅ Create new booking
      const booking = await Booking.create({
            ...bookingData,
            status: 'BOOKED',
            bookedAt: new Date(),
      });

      return booking;
};
const getAllBookings = async (): Promise<IBooking[]> => {
      const bookings = await Booking.find({}).populate('trainee').populate('schedule').populate('trainer');
      return bookings;
};
const getAllMyBookings = async (traineeId: string): Promise<IBooking[]> => {
      console.log(traineeId,"=============================");
      const bookings = await Booking.find({ trainee: traineeId })
            .populate('trainee', 'name email')
            .populate('schedule')
            .populate('trainer');
      return bookings;
};
const updateBookingStatus = async (id: string, status: string): Promise<IBooking> => {
      const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
      if (!booking) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Booking not found');
      }
      return booking;
};
export const BookingService = {
      createBooking,
      getAllBookings,
      getAllMyBookings,
      updateBookingStatus,
};
