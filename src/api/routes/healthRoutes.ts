import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../../lib/prisma';
import logger from '../../lib/logger';

const router = Router();

/**
 * @swagger
 * /health:
 * get:
 * summary: Performs a health check on the application and its dependencies.
 * tags: [Health]
 * responses:
 * 200:
 * description: Application is healthy.
 * 503:
 * description: Application is unhealthy (e.g., database connection failed).
 */
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // Check database connectivity
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'ok', message: 'The void is responsive.' });
  } catch (error) {
    logger.error(error, 'Health check failed!');
    res.status(503).json({ status: 'error', message: 'The void is silent.' });
  }
});

export default router;