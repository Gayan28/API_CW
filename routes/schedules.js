import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { createSchedule, getSchedules, getSchedule, updateSchedule, deleteSchedule, getSchedulesByRoute, getSchedulesByDate } from '../controllers/scheduleController.js';

const router = express.Router();

router.post('/create', protect, authorize('admin','operator'), createSchedule);
router.get('/get', getSchedules);
router.get('/get/:id', getSchedule);
router.put('/update/:id', protect, authorize('admin','operator'), updateSchedule);
router.delete('/delete/:id', protect, authorize('admin'), deleteSchedule);

// Custom endpoints
router.get('/byRoute/:routeId', getSchedulesByRoute);
router.get('/byDate/:date', getSchedulesByDate);

export default router;
