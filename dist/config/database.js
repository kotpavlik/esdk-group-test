"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getMongoURI = () => {
    const nodeEnv = process.env.NODE_ENV || 'development';
    if (nodeEnv === 'production') {
        return process.env.MONGO_URL || 'mongodb://localhost:27017/esdk_group_test_prod';
    }
    else {
        return process.env.MONGO_LOCAL || 'mongodb://localhost:27017/esdk_group_test';
    }
};
exports.databaseConfig = {
    mongodb: {
        uri: getMongoURI(),
        host: process.env.MONGODB_HOST || 'localhost',
        port: parseInt(process.env.MONGODB_PORT || '27017'),
        database: process.env.MONGODB_DATABASE || (process.env.NODE_ENV === 'development' ? 'esdk_group_test' : 'esdk_group_test_prod'),
        options: {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        }
    },
    app: {
        port: parseInt(process.env.PORT || '3000'),
        nodeEnv: process.env.NODE_ENV || 'development',
        corsOrigin: process.env.USER_URL || 'http://localhost:3000',
        baseUrl: process.env.NODE_ENV === 'development'
            ? process.env.BASE_URL_LOCAL || 'http://localhost:3001'
            : process.env.BASE_URL_PROD || 'https://esdk-group-test-production.up.railway.app'
    }
};
exports.default = exports.databaseConfig;
//# sourceMappingURL=database.js.map