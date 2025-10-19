import { Router } from "express";
import { ScheduleController } from "./schedule.controller";

const router = Router();

router.post("/", ScheduleController.createSchedule);      // Create
router.get("/", ScheduleController.getAllSchedules);      // Get all
router.get("/:id", ScheduleController.getScheduleById);   // Get by ID
router.patch("/:id", ScheduleController.updateScheduleById);    // Update
router.delete("/:id", ScheduleController.deleteScheduleById); // Delete

export const ScheduleRouter = router;
