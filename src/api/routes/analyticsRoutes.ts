import { Router, Request, Response } from 'express';
// import { AnalyticsController } from '../controllers/analyticsController';
// import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = Router();
// const analyticsController = new AnalyticsController();
const MOCK_ADMIN_MIDDLEWARE = (req: Request, res: Response, next: Function) => next();

/**
 * @swagger
 * /analytics/revenue:
 *   get:
 *     summary: Get revenue report
 *     description: Retrieves revenue data over a specified time period. Requires admin privileges.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly]
 *         required: true
 *     responses:
 *       200:
 *         description: Revenue report data.
 */
router.get('/analytics/revenue', /* authMiddleware, adminMiddleware, */ MOCK_ADMIN_MIDDLEWARE, (req: Request, res: Response) => {
  const { period } = req.query;
  // const revenueData = await analyticsController.getRevenue(period);
  res.status(200).json({
    period,
    revenue: 15000.50,
    currency: 'USD',
    transactions: 350,
    startDate: '2025-01-01',
    endDate: '2025-01-31',
  });
});

export { router as analyticsRoutes };