import { Document, ObjectId } from "mongoose";

export interface ISchedule extends Document {
  title: string;
  date: string; 
  startTime: string; 
  endTime: string; 
  trainer: ObjectId;
  maxTrainees: number;
}
