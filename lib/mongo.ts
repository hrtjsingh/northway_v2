import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/northwayvisa';

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return; 
  }
  return mongoose.connect(MONGODB_URI);
}