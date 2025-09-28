import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { createRoute, getRoutes, getRoute, updateRoute, deleteRoute } from '../controllers/routeController.js';

const router = express.Router();

router.post('/', protect, authorize('admin'), createRoute);
router.get('/', getRoutes);
router.get('/:id', getRoute);
router.put('/:id', protect, authorize('admin'), updateRoute);
router.delete('/:id', protect, authorize('admin'), deleteRoute);

export default router;
