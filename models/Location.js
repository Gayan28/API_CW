import mongoose from 'mongoose';
const LocationSchema = new mongoose.Schema({
  bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  speed: Number,
  timestamp: { type: Date, default: Date.now }
});
export default mongoose.model('Location', LocationSchema);
