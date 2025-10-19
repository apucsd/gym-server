import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

// ------------------ Create a Booking ------------------
// Only TRAINEE can book a schedule
router.post(
  '/',
  auth(USER_ROLES.TRAINEE),
  validateRequest(BookingValidation.createBookingZodSchema),
  BookingController.createBooking
);



// ADMIN or TRAINER can view bookings
router.get(
  '/',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.TRAINER),
  BookingController.getAllBookings
);
router.patch(
  '/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.TRAINER),
  BookingController.updateBookingStatus
);

//
router.get('/my-bookings', auth(USER_ROLES.TRAINEE, USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.TRAINER), BookingController.getAllMyBookings);



export const BookingRoutes = router;
