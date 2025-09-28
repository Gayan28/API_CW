import Location from '../models/Location.js';
import Bus from '../models/Bus.js';

// Save a new location (operators can push updates)
export const addLocation = async (req, res, next) => {
  try {
    const { busId, lat, lng, speed } = req.body;
    const bus = await Bus.findOne({ busId });
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    const loc = await Location.create({ bus: bus._id, lat, lng, speed });
    res.status(201).json(loc);
  } catch (err) { next(err); }
};

// Get latest location for a bus
export const getLatestLocation = async (req, res, next) => {
  try {
    const { busId } = req.params;
    const bus = await Bus.findOne({ busId });
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    const loc = await Location.findOne({ bus: bus._id }).sort({ timestamp: -1 });
    res.json(loc);
  } catch (err) { next(err); }
};

// Get all active bus latest positions (one per bus)
export const getAllLatest = async (req, res, next) => {
  try {
    // Aggregate to get latest per bus
    const latest = await Location.aggregate([
      { $sort: { timestamp: -1 } },
      { $group: { _id: "$bus", doc: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$doc" } },
      { $lookup: { from: 'buses', localField: 'bus', foreignField: '_id', as: 'bus' } },
      { $unwind: '$bus' }
    ]);
    res.json(latest);
  } catch (err) { next(err); }
};
