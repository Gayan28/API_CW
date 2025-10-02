import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  complaintId: {
    type: String,
    required: true,
    unique: true
  },
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
  commuter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // who submitted the complaint
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Complaint', complaintSchema);
