import { Router, Request, Response } from 'express';
// import { OrderController } from '../controllers/orderController';
// import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
// const orderController = new OrderController();

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: Creates a new order for a user, typically containing one or more products.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created successfully.
 */
router.post('/orders', /* authMiddleware, */ (req: Request, res: Response) => {
  // const { userId, productIds } = req.body;
  // const newOrder = await orderController.create(userId, productIds);
  res.status(201).json({ message: 'Order created successfully', orderId: 'order_xyz789' });
});

/**
 * @swagger
 * /orders/user/{userId}:
 *   get:
 *     summary: Get user's order history
 *     description: Retrieves the order history for a specific user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of orders.
 */
router.get('/orders/user/:userId', /* authMiddleware, */ (req: Request, res: Response) => {
  const { userId } = req.params;
  // const orders = await orderController.getForUser(userId);
  const orders = [
    { orderId: 'order_abc123', date: new Date(), total: 49.99, status: 'Completed' },
    { orderId: 'order_def456', date: new Date(), total: 99.99, status: 'Processing' },
  ];
  res.status(200).json(orders);
});

export { router as orderRoutes };