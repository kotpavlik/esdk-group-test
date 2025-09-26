// Настройки для тестов Jest
import 'reflect-metadata';

// Устанавливаем переменные окружения для тестов
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost:27017/esdk_group_test';

// Увеличиваем таймаут для тестов
jest.setTimeout(10000);
