import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { createBus, getBuses, getBus, updateBus, deleteBus } from '../controllers/busController.js';

const router = express.Router();

router.post('/create', protect, authorize('admin','operator'), createBus);
router.get('/get', getBuses);
router.get('/get/:id', getBus);
router.put('/update/:id', protect, authorize('admin','operator'), updateBus);
router.delete('/delete/:id', protect, authorize('admin'), deleteBus);

export default router;
