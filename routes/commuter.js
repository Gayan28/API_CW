import express from 'express';
import { createComplaint, getMyComplaints, getAllComplaints } from '../controllers/complaintController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

/**
 * Commuter: Create a new complaint
 */
router.post('/create_complain', protect, authorize('commuter'), createComplaint);

/**
 * Commuter: Get my complaints
 */
router.get('/get_complains', protect, authorize('commuter'), getMyComplaints);



export default router;
