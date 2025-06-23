import { Router, Request, Response } from 'express';
// import { SubscriptionController } from '../controllers/subscriptionController';
// import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
// const subscriptionController = new SubscriptionController();

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     description: Subscribes a user to a recurring payment plan.
 *     responses:
 *       201:
 *         description: Subscription created successfully.
 */
router.post('/subscriptions', /* authMiddleware, */ (req: Request, res: Response) => {
  // const { userId, planId } = req.body;
  // const subscription = await subscriptionController.create(userId, planId);
  res.status(201).json({ message: 'Subscription activated', subscriptionId: 'sub_alpha1' });
});

/**
 * @swagger
 * /subscriptions/{id}:
 *   delete:
 *     summary: Cancel a subscription
 *     description: Cancels an active subscription for a user.
 *     responses:
 *       200:
 *         description: Subscription cancelled successfully.
 */
router.delete('/subscriptions/:id', /* authMiddleware, */ (req: Request, res: Response) => {
  const { id } = req.params;
  // await subscriptionController.cancel(id);
  res.status(200).json({ message: `Subscription ${id} has been canceled.` });
});

export { router as subscriptionRoutes };