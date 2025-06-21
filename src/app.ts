import express, { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import paymentRouter from './api/routes/paymentRoutes';
import healthRouter from './api/routes/healthRoutes'; // Import health router
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import { swaggerOptions } from './config/swaggerOptions';
import { apiKeyAuth } from './middleware/authMiddleware';

const app: Application = express();

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(requestLogger);

// Non-authenticated, public routes
app.get('/', (_req: Request, res: Response) => {
  res.send('The server is running, but the bill will never be paid.');
});
app.use('/health', healthRouter);

// Authenticated API Routes
app.use('/api/payments', apiKeyAuth, paymentRouter);

app.use(errorHandler);

export default app;