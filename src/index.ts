import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from "dotenv";
import routes from './routes/routes';
import connectDB from './db/connection';
import { databaseConfig } from './config/database';

dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

async function bootstrap() {
  // MongoDB
  await connectDB();
  
  const app = express();

  // CORS настройки в зависимости от окружения
  const corsOrigins: string[] = NODE_ENV === 'development' 
    ? ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:3001', process.env.USER_URL || 'http://localhost:3000']
    : [process.env.BASE_URL_PROD || 'https://esdk-group-test-production.up.railway.app','https://esdk-group-front-test.vercel.app/', process.env.USER_URL].filter(Boolean) as string[];
    
  app.use(cors({
    origin: corsOrigins,
    credentials: true
  }));

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Глобальный префикс v1
  app.use('/v1', (req, res, next) => {
    next();
  });

  // Basic health check
  app.get('/v1/health', (req, res) => {
    res.json({ 
      status: 'OK', 
      message: 'ESDK Group Test API is running!',
      timestamp: new Date().toISOString(),
      environment: NODE_ENV
    });
  });



  app.use('/v1', routes);

  // Swagger документация
  const swaggerOptions: swaggerJsdoc.Options = {
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
          url: NODE_ENV === 'development' 
            ? `http://localhost:${PORT}/v1`
            : `${process.env.BASE_URL_PROD || 'https://esdk-group-test-production.up.railway.app'}/v1`,
          description: NODE_ENV === 'development' ? 'Development server' : 'Production server'
        }
      ],
      tags: [
        {
          name: 'ESDK',
          description: 'Main API operations'
        }
      ]
    },
    apis: ['./src/routes/*.ts'] 
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: 'Route not found',
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString()
    });
  });

  // Error handler
  app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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