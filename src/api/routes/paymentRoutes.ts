import { Router, Request, Response, NextFunction } from 'express';
import { paymentService } from '../../services/paymentService';
import { validateRequest } from '../../middleware/validationMiddleware';
import {
  observePaymentSchema,
  paymentIdSchema,
} from '../../validators/paymentSchemas';

const router = Router();

/**
 * @swagger
 * /api/payments/observe:
 * post:
 * summary: Observe and defer a new payment request
 * tags: [Payments]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * amount:
 * type: number
 * example: 199.99
 * creditor:
 * type: string
 * example: "Global Corp"
 * responses:
 * 202:
 * description: Request acknowledged and deferred.
 */
router.post(
  '/observe',
  validateRequest(observePaymentSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await paymentService.observe(req.body);
      res.status(202).json({
        message: 'Payment request observed and deferred.',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @swagger
 * /api/payments/{id}:
 * get:
 * summary: Get the status of a specific payment request
 * tags: [Payments]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: The payment request ID
 * example: req_1633123456789
 * responses:
 * 200:
 * description: Request status retrieved.
 * 404:
 * description: Request ID not found in the void.
 */
router.get(
  '/:id',
  validateRequest(paymentIdSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await paymentService.getStatus(id);
      if (!result) {
        return res
          .status(404)
          .json({ message: 'Request ID not found in the void.' });
      }
      res.status(200).json({
        message: 'Request status retrieved.',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;