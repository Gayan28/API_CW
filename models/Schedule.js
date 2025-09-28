import mongoose from 'mongoose';
const ScheduleSchema = new mongoose.Schema({
  bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  tripDate: { type: Date, required: true }
}, { timestamps: true });
export default mongoose.model('Schedule', ScheduleSchema);
