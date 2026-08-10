const mongoose = require('mongoose');
const config = require('./env');

async function connectDB() {
  try {
    if (!config.MONGODB_URI) {
      console.error('MongoDB connection failed: MONGODB_URI is not set');
      return false;
    }

    const conn = await mongoose.connect(config.MONGODB_URI);
    console.log(`MongoDB connected: database "${conn.connection.name}"`);
    return true;
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    return false;
  }
}

module.exports = connectDB;
