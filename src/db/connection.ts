import mongoose from 'mongoose';
import { databaseConfig } from '../config/database';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = databaseConfig.mongodb.uri;
    const nodeEnv = process.env.NODE_ENV || 'development';
    
    console.log(`🔗 Attempting to connect to MongoDB...`);
    console.log(`🌍 Environment: ${nodeEnv}`);
    console.log(`🔗 URI: ${mongoURI}`);
    
    const conn = await mongoose.connect(mongoURI, databaseConfig.mongodb.options);
    
    console.log(`🗄️  MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`📍 Connection Type: ${nodeEnv === 'development' ? 'LOCAL (MONGO_LOCAL)' : 'PRODUCTION (MONGO_URL)'}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.error('🔍 Check your MongoDB service in Railway dashboard');
    console.error('🔍 Verify MONGO_URL environment variable is set correctly');
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
