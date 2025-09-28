import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Route from './models/BusRoute.js';
import Bus from './models/Bus.js';
import Schedule from './models/Schedule.js';
import Location from './models/Location.js';
import User from './models/User.js';
import bcrypt from 'bcrypt';

dotenv.config();
await connectDB();

const clear = async () => {
  await Route.deleteMany({});
  await Bus.deleteMany({});
  await Schedule.deleteMany({});
  await Location.deleteMany({});
  await User.deleteMany({});
};

const routesData = [
  { code: 'CMB-KDY', origin: 'Colombo', destination: 'Kandy' },
  { code: 'CMB-GAL', origin: 'Colombo', destination: 'Galle' },
  { code: 'CMB-JAF', origin: 'Colombo', destination: 'Jaffna' },
  { code: 'KDY-TRI', origin: 'Kandy', destination: 'Trincomalee' },
  { code: 'GAM-NEG', origin: 'Gampaha', destination: 'Negombo' }
];

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const main = async () => {
  await clear();

  // create users: admin + one operator
  const salt = await bcrypt.genSalt(10);
  const adminPass = await bcrypt.hash('AdminPass123', salt);
  const opPass = await bcrypt.hash('Operator123', salt);

  await User.create([
    { name: 'Lecturer', email: 'lecturer@example.com', password: adminPass, role: 'admin' },
    { name: 'Operator One', email: 'operator@example.com', password: opPass, role: 'operator' }
  ]);

  const createdRoutes = await Route.insertMany(routesData);

  // create 25 buses, assign routes in round-robin
  const buses = [];
  for (let i = 1; i <= 25; i++) {
    const r = createdRoutes[(i - 1) % createdRoutes.length];
    buses.push({
      busId: `BUS-${1000 + i}`,
      operator: `Operator-${Math.ceil(i/5)}`,
      capacity: 45 + (i % 5),
      route: r._id
    });
  }
  const createdBuses = await Bus.insertMany(buses);

  // schedule for next 7 days: each bus one trip per day at random times
  const now = new Date();
  const schedules = [];
  for (let d = 0; d < 7; d++) {
    for (const bus of createdBuses) {
      const tripDate = new Date(now);
      tripDate.setDate(now.getDate() + d);
      // pick departure between 5:00 and 20:00
      const depHour = Math.floor(randomBetween(5, 20));
      const dep = new Date(tripDate);
      dep.setHours(depHour, Math.floor(randomBetween(0, 59)), 0, 0);
      const durHours = Math.floor(randomBetween(2, 6));
      const arr = new Date(dep);
      arr.setHours(dep.getHours() + durHours);
      schedules.push({
        bus: bus._id,
        route: bus.route,
        departureTime: dep,
        arrivalTime: arr,
        tripDate: tripDate
      });
    }
  }
  await Schedule.insertMany(schedules);

  // create a few location points per bus (simulate last known positions)
  const locations = [];
  for (const bus of createdBuses) {
    // create 5 points around a random center
    const baseLat = randomBetween(6.5, 7.5);
    const baseLng = randomBetween(79.8, 80.9);
    for (let p = 0; p < 5; p++) {
      locations.push({
        bus: bus._id,
        lat: baseLat + randomBetween(-0.05, 0.05),
        lng: baseLng + randomBetween(-0.05, 0.05),
        speed: randomBetween(30, 80),
        timestamp: new Date(Date.now() - (p * 60000)) // back in time
      });
    }
  }
  await Location.insertMany(locations);

  console.log('Seeding complete');
  process.exit(0);
};

main().catch(err => {
  console.error(err);
  process.exit(1);
});
