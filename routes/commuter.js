import express from 'express';
import { createComplaint, getMyComplaints, getAllComplaints } from '../controllers/complaintController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

/**
 * Commuter: Create a new complaint
 */
router.post('/', protect, authorize('commuter'), createComplaint);

/**
 * Commuter: Get my complaints
 */
router.get('/my', protect, authorize('commuter'), getMyComplaints);

/**
 * Admin: View all complaints
 */
router.get('/', protect, authorize('admin'), getAllComplaints);

export default router;
