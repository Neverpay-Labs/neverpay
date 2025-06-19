import express, { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import paymentRouter from './api/routes/paymentRoutes';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import { swaggerOptions } from './config/swaggerOptions';

const app: Application = express();

// Swagger
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Middleware
app.use(express.json());
app.use(requestLogger);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('The server is running, but the bill will never be paid.');
});

// API Routes
app.use('/api/payments', paymentRouter);


// Use the centralized error handler after all routes
app.use(errorHandler);

export default app;