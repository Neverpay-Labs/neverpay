import { Router, Request, Response, NextFunction } from 'express';
import { paymentService } from '../../services/paymentService';
import { PaymentRequest } from '../../interfaces/types';

const router = Router();

router.post(
  '/observe',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentRequest: PaymentRequest = req.body;

      if (!paymentRequest.amount || !paymentRequest.creditor) {
        return res.status(400).json({
          message: 'Request lacks substance. Amount and creditor are required.',
        });
      }

      const result = await paymentService.observe(paymentRequest);

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
 * @route GET /api/payments/:id
 * @desc Retrieves the status of a specific deferred payment.
 * @access Public
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await paymentService.getStatus(id);

    if (!result) {
      return res.status(404).json({ message: 'Request ID not found in the void.' });
    }

    res.status(200).json({
      message: 'Request status retrieved.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;