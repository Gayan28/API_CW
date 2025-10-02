import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { createRoute, getRoutes, getRoute, updateRoute, deleteRoute } from '../controllers/routeController.js';

const router = express.Router();

router.post('/create', protect, authorize('admin'), createRoute);
router.get('/get', getRoutes);
router.get('/get/:id', getRoute);
router.put('/update/:id', protect, authorize('admin'), updateRoute);
router.delete('/delete/:id', protect, authorize('admin'), deleteRoute);

export default router;
