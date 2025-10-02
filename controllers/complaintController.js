import Complaint from '../models/Complaint.js';

/**
 * @desc    Create a new complaint (commuter)
 * @route   POST /api/complaints
 * @access  Private (commuter)
 */
export const createComplaint = async (req, res, next) => {
  try {
    const { complaintId, complaintDate, complaintTime, busId, description } = req.body;

    if (!complaintId || !busId || !description || !complaintTime) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const complaint = await Complaint.create({
      complaintId,
      complaintDate,
      complaintTime,
      busId,
      description,
      commuter: req.user._id
    });

    res.status(201).json({ success: true, data: complaint });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all complaints by logged-in commuter
 * @route   GET /api/complaints/my
 * @access  Private (commuter)
 */
export const getMyComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find({ commuter: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: complaints.length, data: complaints });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all complaints (Admin oversight)
 * @route   GET /api/complaints
 * @access  Private (admin)
 */
export const getAllComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find().populate('commuter', 'name email');
    res.json({ success: true, count: complaints.length, data: complaints });
  } catch (err) {
    next(err);
  }
};
