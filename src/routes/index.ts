import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { classRouter } from '../app/modules/class/class.routes';
import { ScheduleRouter } from '../app/modules/schedule/schedule.route';
import { BookingRoutes } from '../app/modules/booking/booking.route';
const router = express.Router();

const apiRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/classes',
        route: classRouter,
    },
    {
        path: '/schedules',
        route: ScheduleRouter,
    },
    {
        path: '/bookings',
        route: BookingRoutes,
    },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
