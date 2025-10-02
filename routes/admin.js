import express from 'express';
import { getAllComplaints } from '../controllers/complaintController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();
/**
 * Admin: View all complaints
 */
router.get('/view_all', protect, authorize('admin'), getAllComplaints);

export default router;