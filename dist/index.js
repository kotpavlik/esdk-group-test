"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes/routes"));
const connection_1 = __importDefault(require("./db/connection"));
const staticSwagger_1 = require("./swagger/staticSwagger");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
async function bootstrap() {
    await (0, connection_1.default)();
    const app = (0, express_1.default)();
    const corsOrigins = NODE_ENV === 'development'
        ? ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:3001', process.env.USER_URL || 'http://localhost:3000']
        : [
            process.env.BASE_URL_PROD || 'https://esdk-group-test-production.up.railway.app',
            'https://esdk-group-front-test.vercel.app',
            process.env.USER_URL
        ].filter(Boolean);
    app.use((0, cors_1.default)({
        origin: corsOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        optionsSuccessStatus: 200
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
    app.use('/v1', (req, res, next) => {
        next();
    });
    app.get('/v1/health', (req, res) => {
        res.json({
            status: 'OK',
            message: 'ESDK Group Test API is running!',
            timestamp: new Date().toISOString(),
            environment: NODE_ENV
        });
    });
    app.use('/v1', routes_1.default);
    let swaggerSpec;
    if (NODE_ENV === 'development') {
        try {
            const swaggerOptions = {
                definition: {
                    openapi: '3.0.0',
                    info: {
                        title: 'ESDK Group Test API',
                        description: 'This application serves for ESDK Group test',
                        version: '1.0.0',
                        contact: {
                            name: 'Igor Anufriev',
                            email: 'developers@esdkgroup.com'
                        }
                    },
                    servers: [
                        {
                            url: `http://localhost:${PORT}/v1`,
                            description: 'Development server'
                        }
                    ],
                    tags: [
                        {
                            name: 'Messages',
                            description: 'Управление сообщениями'
                        }
                    ]
                },
                apis: ['./src/routes/*.ts', './src/routes/swagger.ts']
            };
            swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
            if (!swaggerSpec.paths || Object.keys(swaggerSpec.paths).length === 0) {
                console.log('⚠️  Swagger: No API paths found in development, using static documentation');
                swaggerSpec = staticSwagger_1.staticSwaggerSpec;
            }
        }
        catch (error) {
            console.log('⚠️  Swagger: Error loading documentation in development, using static documentation');
            swaggerSpec = staticSwagger_1.staticSwaggerSpec;
        }
    }
    else {
        console.log('📚 Swagger: Using static documentation for production');
        swaggerSpec = staticSwagger_1.staticSwaggerSpec;
    }
    app.use('/v1/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    app.use((req, res) => {
        res.status(404).json({
            success: false,
            error: 'Route not found',
            path: req.originalUrl,
            method: req.method,
            timestamp: new Date().toISOString()
        });
    });
    app.use((error, req, res, next) => {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: NODE_ENV === 'production' ? 'Internal server error' : error.message,
            timestamp: new Date().toISOString()
        });
    });
    const baseUrl = NODE_ENV === 'development'
        ? `http://localhost:${PORT}`
        : process.env.BASE_URL_PROD || 'https://esdk-group-test-production.up.railway.app';
    app.listen(PORT, () => {
        console.log(`🚀 ESDK Group Test API is running on port ${PORT}`);
        console.log(`📚 Swagger docs available at ${baseUrl}/v1/docs`);
        console.log(`❤️  Health check at ${baseUrl}/v1/health`);
        console.log(`🌍 Environment: ${NODE_ENV}`);
        console.log(`🔗 CORS enabled for: ${corsOrigins.join(', ')}`);
        console.log(`🌐 Base URL: ${baseUrl}`);
    });
}
bootstrap().catch(console.error);
//# sourceMappingURL=index.js.map