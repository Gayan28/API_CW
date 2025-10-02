import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  complaintDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  complaintTime: {
    type: String,
    required: true
  },
  busId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  userId: {   // Explicit field for commuter userId
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Complaint', complaintSchema);
