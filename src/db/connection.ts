import mongoose from 'mongoose';
import { databaseConfig } from '../config/database';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = databaseConfig.mongodb.uri;
    const nodeEnv = process.env.NODE_ENV || 'development';
    
    const conn = await mongoose.connect(mongoURI, databaseConfig.mongodb.options);
    
    console.log(`🗄️  MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔗 URI: ${mongoURI}`);
    console.log(`🌍 Environment: ${nodeEnv}`);
    console.log(`📍 Connection Type: ${nodeEnv === 'development' ? 'LOCAL (MONGO_LOCAL)' : 'PRODUCTION (MONGO_URL)'}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Обработка отключения
mongoose.connection.on('disconnected', () => {
  console.log('🔌 MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});

export default connectDB;
