import express from 'express';
import { addLocation, getLatestLocation, getAllLatest } from '../controllers/locationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   POST /api/locations
 * @desc    Add new location for a bus (operator/admin only)
 * @access  Private
 */
router.post('/', protect, authorize('operator', 'admin'), addLocation);

/**
 * @route   GET /api/locations/:busId/latest
 * @desc    Get latest location of a specific bus
 * @access  Public
 */
router.get('/:busId/latest', getLatestLocation);

/**
 * @route   GET /api/locations/latest/all
 * @desc    Get latest locations of all active buses
 * @access  Public
 */
router.get('/latest/all', getAllLatest);

export default router;
