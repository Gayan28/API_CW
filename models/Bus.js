import mongoose from 'mongoose';
const BusSchema = new mongoose.Schema({
  busId: { type: String, required: true, unique: true },
  operator: { type: String, required: true },
  capacity: { type: Number, default: 50 },
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  status: { type: String, enum: ['active','inactive','maintenance'], default: 'active' }
}, { timestamps: true });
export default mongoose.model('Bus', BusSchema);
