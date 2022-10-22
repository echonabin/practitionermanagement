import { DatabaseConnectionError } from '../errors/database-connection-error';
import mongoose from 'mongoose';

export const startupDb = async () => {
  try {
    await mongoose.connect(process.env.NX_MONGODB_URI, {});
    console.log('🔌 Connected to MongoDB');
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError();
  }
};
