import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { createSchedule, getSchedules, getSchedule, updateSchedule, deleteSchedule, getSchedulesByRoute, getSchedulesByDate } from '../controllers/scheduleController.js';

const router = express.Router();

router.post('/', protect, authorize('admin','operator'), createSchedule);
router.get('/', getSchedules);
router.get('/:id', getSchedule);
router.put('/:id', protect, authorize('admin','operator'), updateSchedule);
router.delete('/:id', protect, authorize('admin'), deleteSchedule);

// Custom endpoints
router.get('/byRoute/:routeId', getSchedulesByRoute);
router.get('/byDate/:date', getSchedulesByDate);

export default router;
