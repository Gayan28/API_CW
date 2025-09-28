import mongoose from 'mongoose';
const RouteSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  waypoints: [{ type: String }] // optional stops
}, { timestamps: true });
export default mongoose.model('Route', RouteSchema);
