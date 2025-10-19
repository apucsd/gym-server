import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { ScheduleService } from "./schedule.service";

const createSchedule = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { ...userData } = req.body;

    const result = await ScheduleService.createScheduleIntoDB(userData);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Schedule created successfully',
        data: result,
    });
}); 

const getAllSchedules = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await ScheduleService.getAllSchedulesFromDB();

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'All schedules retrieved successfully',
        data: result,
    });
});

const getScheduleById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await ScheduleService.getScheduleByIdFromDB(id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Schedule retrieved successfully',
        data: result,
    });
});

const updateScheduleById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { ...userData } = req.body;

    const result = await ScheduleService.updateScheduleByIdFromDB(id, userData);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Schedule updated successfully',
        data: result,
    });
});

const deleteScheduleById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await ScheduleService.deleteScheduleByIdFromDB(id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Schedule deleted successfully',
        data: result,
    });
});

export const ScheduleController = {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    updateScheduleById,
    deleteScheduleById,
};