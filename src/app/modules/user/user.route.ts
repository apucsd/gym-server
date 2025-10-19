import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.get(
    '/profile',
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.TRAINEE, USER_ROLES.TRAINER),
    UserController.getUserProfile,
);

//create a new user
router.route('/create-user').post(validateRequest(UserValidation.createUserZodSchema), UserController.createUser);

// update user profile
router
    .route('/update-profile')
    .patch(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.TRAINEE, USER_ROLES.TRAINER),
        fileUploadHandler(),
        UserController.updateProfile,
    );

    router.route('/update-user-by-id').patch(auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), UserController.updateUserById);


// get all users
router.route('/all-user').get(auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), UserController.getAllUsers);
// get all trainers
router.route('/all-trainer').get(auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), UserController.getAllTrainers);
// //get single user by id
// router.route('/:id').get( auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.TRAINEE,USER_ROLES.TRAINER), UserController.getUserById);

//  delete user account
// router.route('/').patch( auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.TRAINEE,USER_ROLES.TRAINER), UserController.deleteAccount);
export const UserRoutes = router;
