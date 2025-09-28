import express from 'express';
import { addLocation, getLatestLocation, getAllLatest } from '../controllers/locationController.js';
import { protect, authorize } from '../middleware/auth.js';
const router = express.Router();

router.post('/', protect, authorize('operator','admin'), addLocation);
router.get('/:busId/latest', getLatestLocation);
router.get('/latest/all', getAllLatest);

export default router;
