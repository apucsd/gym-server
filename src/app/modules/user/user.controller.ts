import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { ...userData } = req.body;

    const result = await UserService.createUserToDB(userData);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'User created successfully',
        data: result,
    });
});


const getUserProfile = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const result = await UserService.getUserProfileFromDB(user);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Profile data retrieved successfully',
        data: result,
    });
});


const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const { data, meta } = await UserService.getAllUserFromDB(req.query);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'All users retrieved successfully',
        data: {
            data,
            meta,
        },
    });
});


const updateProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    let profile;
    console.log(req.files)
    // Check for file upload
    if (req.files && 'image' in req.files && req.files.image[0]) {
        profile = `/images/${req.files.image[0].filename}`;
    }
    console.log(req.body)
    // Create data object for updating the profile
    const data = {
        profile,
        ...req.body,
    };

    // Log for debugging (remove in production)

    // Update the profile in the database
    const result = await UserService.updateProfileToDB(user, data);

    // Send the response back
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Profile updated successfully',
        data: result,
    });
});

const updateUserById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { ...userData } = req.body;
    const result = await UserService.updateUserByIdToDB(req.params.id, userData);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'User updated successfully',
        data: result,
    });
});

const getAllTrainers = catchAsync(async (req: Request, res: Response) => {
    const { data, meta } = await UserService.getAllTrainerFromDB(req.query);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'All trainers retrieved successfully',
        data: {
            data,
            meta,
        },
    });
});

export const UserController = {
    createUser,
    getUserProfile,
    updateProfile,
    getAllUsers,
    updateUserById,
    getAllTrainers,
};
