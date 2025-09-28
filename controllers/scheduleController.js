import Schedule from '../models/Schedule.js';
import Bus from '../models/Bus.js';
import Route from '../models/Route.js';

// Create schedule
export const createSchedule = async (req, res, next) => {
  try {
    const { bus, route, departureTime, arrivalTime, tripDate } = req.body;
    const foundBus = await Bus.findById(bus);
    const foundRoute = await Route.findById(route);
    if (!foundBus || !foundRoute) return res.status(404).json({ message: 'Bus or Route not found' });

    const schedule = await Schedule.create({ bus, route, departureTime, arrivalTime, tripDate });
    res.status(201).json(schedule);
  } catch (err) { next(err); }
};

// Get all schedules
export const getSchedules = async (req, res, next) => {
  try {
    const schedules = await Schedule.find().populate('bus').populate('route');
    res.json(schedules);
  } catch (err) { next(err); }
};

// Get single schedule
export const getSchedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.findById(req.params.id).populate('bus').populate('route');
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    res.json(schedule);
  } catch (err) { next(err); }
};

// Update schedule
export const updateSchedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    res.json(schedule);
  } catch (err) { next(err); }
};

// Delete schedule
export const deleteSchedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    res.json({ message: 'Schedule deleted' });
  } catch (err) { next(err); }
};

// List schedules by route ID
export const getSchedulesByRoute = async (req, res, next) => {
  try {
    const schedules = await Schedule.find({ route: req.params.routeId })
      .populate('bus')
      .populate('route');
    res.json(schedules);
  } catch (err) { next(err); }
};

// List schedules by trip date (yyyy-mm-dd)
export const getSchedulesByDate = async (req, res, next) => {
  try {
    const dateStr = req.params.date; // format: 2025-09-28
    const start = new Date(dateStr);
    const end = new Date(dateStr);
    end.setDate(start.getDate() + 1);

    const schedules = await Schedule.find({
      tripDate: { $gte: start, $lt: end }
    }).populate('bus').populate('route');

    res.json(schedules);
  } catch (err) { next(err); }
};
