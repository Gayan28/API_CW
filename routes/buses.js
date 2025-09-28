import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { createBus, getBuses, getBus, updateBus, deleteBus } from '../controllers/busController.js';

const router = express.Router();

router.post('/', protect, authorize('admin','operator'), createBus);
router.get('/', getBuses);
router.get('/:id', getBus);
router.put('/:id', protect, authorize('admin','operator'), updateBus);
router.delete('/:id', protect, authorize('admin'), deleteBus);

export default router;
