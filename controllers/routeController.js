import Route from '../models/BusRoute.js';

// Create route
export const createRoute = async (req, res, next) => {
  try {
    const { code, origin, destination, waypoints } = req.body;
    const route = await Route.create({ code, origin, destination, waypoints });
    res.status(201).json(route);
  } catch (err) { next(err); }
};

// Get all routes
export const getRoutes = async (req, res, next) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) { next(err); }
};

// Get single route by ID
export const getRoute = async (req, res, next) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route);
  } catch (err) { next(err); }
};

// Update route
export const updateRoute = async (req, res, next) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route);
  } catch (err) { next(err); }
};

// Delete route
export const deleteRoute = async (req, res, next) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json({ message: 'Route deleted' });
  } catch (err) { next(err); }
};
