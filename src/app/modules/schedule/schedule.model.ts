import { Schema, model } from "mongoose";
import { ISchedule } from "./schedule.interface";

const scheduleSchema = new Schema<ISchedule>({
  title: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  trainer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  maxTrainees: { type: Number, default: 10 },
},{
    timestamps:true
});

export const ScheduleModel = model<ISchedule>("Schedule", scheduleSchema);
