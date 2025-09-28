"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
const connectDB = async () => {
    try {
        const mongoURI = database_1.databaseConfig.mongodb.uri;
        const nodeEnv = process.env.NODE_ENV || 'development';
        console.log(`🔗 Attempting to connect to MongoDB...`);
        console.log(`🌍 Environment: ${nodeEnv}`);
        console.log(`🔗 URI: ${mongoURI}`);
        const conn = await mongoose_1.default.connect(mongoURI, database_1.databaseConfig.mongodb.options);
        console.log(`🗄️  MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
        console.log(`📍 Connection Type: ${nodeEnv === 'development' ? 'LOCAL (MONGO_LOCAL)' : 'PRODUCTION (MONGO_URL)'}`);
    }
    catch (error) {
        console.error('❌ MongoDB connection error:', error);
        console.error('🔍 Check your MongoDB service in Railway dashboard');
        console.error('🔍 Verify MONGO_URL environment variable is set correctly');
        process.exit(1);
    }
};
mongoose_1.default.connection.on('disconnected', () => {
    console.log('🔌 MongoDB disconnected');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('❌ MongoDB error:', err);
});
exports.default = connectDB;
//# sourceMappingURL=connection.js.map