import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import paymentRouter from './api/routes/paymentRoutes';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import { swaggerOptions } from './config/swaggerOptions';
import { apiKeyAuth } from './middleware/authMiddleware';

const app: Application = express();

// Swagger
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Middleware
app.use(express.json());
app.use(requestLogger);

// API Routes - now protected by API Key
app.use('/api/payments', apiKeyAuth, paymentRouter);


// Use the centralized error handler after all routes
app.use(errorHandler);

export default app;