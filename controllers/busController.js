import Bus from '../models/Bus.js';
import Route from '../models/BusRoute.js';

// Create bus
export const createBus = async (req, res, next) => {
  try {
    const { busId, operator, capacity, route } = req.body;
    const foundRoute = await Route.findById(route);
    if (!foundRoute) return res.status(404).json({ message: 'Route not found' });
    const bus = await Bus.create({ busId, operator, capacity, route });
    res.status(201).json(bus);
  } catch (err) { next(err); }
};

// Get all buses
export const getBuses = async (req, res, next) => {
  try {
    const buses = await Bus.find().populate('route');
    res.json(buses);
  } catch (err) { next(err); }
};

// Get single bus
export const getBus = async (req, res, next) => {
  try {
    const bus = await Bus.findById(req.params.id).populate('route');
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json(bus);
  } catch (err) { next(err); }
};

// Update bus
export const updateBus = async (req, res, next) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json(bus);
  } catch (err) { next(err); }
};

// Delete bus
export const deleteBus = async (req, res, next) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json({ message: 'Bus deleted' });
  } catch (err) { next(err); }
};
