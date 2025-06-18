import { Router, Request, Response, NextFunction } from 'express';
import { paymentService } from '../../services/paymentService';
import { PaymentRequest } from '../../interfaces/types';

const router = Router();

/**
 * @route POST /api/payments/observe
 * @desc The "Observer" module logs a new payment request into the system.
 * The controller's job is to validate input and hand off to the service.
 * @access Public
 */
router.post(
  '/observe',
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentRequest: PaymentRequest = req.body;

      if (!paymentRequest.amount || !paymentRequest.creditor) {
        return res.status(400).json({
          message: 'Request lacks substance. Amount and creditor are required.',
        });
      }
      
      const result = paymentService.observe(paymentRequest);

      res.status(202).json({
        message: 'Payment request observed. Deferment protocol initiated.',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;