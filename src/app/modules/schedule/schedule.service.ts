import { ScheduleModel } from "./schedule.model";

const createScheduleIntoDB = async (data: any) => {
    const result = await ScheduleModel.create(data);
    if (!result) {
        throw new Error("Failed to create schedule");
    }
    return result;
};

const getAllSchedulesFromDB = async () => {
    const result = await ScheduleModel.find();
    if (!result) {
        throw new Error("No schedules found");
    }
    return result;
};

const getScheduleByIdFromDB = async (id: string) => {
    const result = await ScheduleModel.findById(id);
    if (!result) {
        throw new Error("This schedule does not exist");
    }
    return result;
};

const updateScheduleByIdFromDB = async (id: string, data: any) => {
    const result = await ScheduleModel.findByIdAndUpdate(id, data);
    if (!result) {
        throw new Error("This schedule does not exist");
    }
    return result;
};

const deleteScheduleByIdFromDB = async (id: string) => {
    const result = await ScheduleModel.findByIdAndDelete(id);
    if (!result) {
        throw new Error("This schedule does not exist");
    }
    return result;
};


export const ScheduleService = {
    createScheduleIntoDB,
    getAllSchedulesFromDB,
    getScheduleByIdFromDB,
    updateScheduleByIdFromDB,
    deleteScheduleByIdFromDB,
};