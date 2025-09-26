import dotenv from 'dotenv';

dotenv.config();

// Определяем URI в зависимости от окружения
const getMongoURI = (): string => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  
  if (nodeEnv === 'development') {
    return process.env.MONGO_LOCAL || 'mongodb://localhost:27017/esdk_group_test';
  } else {
    return process.env.MONGO_URL || 'mongodb://localhost:27017/esdk_group_test_prod';
  }
};

export const databaseConfig = {
  // MongoDB настройки
  mongodb: {
    uri: getMongoURI(),
    host: process.env.MONGODB_HOST || 'localhost',
    port: parseInt(process.env.MONGODB_PORT || '27017'),
    database: process.env.MONGODB_DATABASE || (process.env.NODE_ENV === 'development' ? 'esdk_group_test' : 'esdk_group_test_prod'),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    }
  },
  
  // Настройки приложения
  app: {
    port: parseInt(process.env.PORT || '3000'),
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.USER_URL || 'http://localhost:3000',
    baseUrl: process.env.NODE_ENV === 'development' 
      ? process.env.BASE_URL_LOCAL || 'http://localhost:3001'
      : process.env.BASE_URL_PROD || 'https://esdk-group-test-production.up.railway.app'
  }
};

export default databaseConfig;
