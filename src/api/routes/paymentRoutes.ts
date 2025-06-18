import { Router, Request, Response } from "express";

const router = Router();

/**
 * @route POST /api/payments/observe
 * @desc The "Observer" module logs a new payment request into the system.
 * @access Public
 */
router.post("/observe", (req: Request, res: Response) => {
  const { amount, creditor, description } = req.body;

  if (!amount || !creditor) {
    return res
      .status(400)
      .json({
        message: "Request lacks substance. Amount and creditor are required.",
      });
  }

  console.log(
    `[Observer]: New payment request logged: ${amount} to ${creditor} for "${
      description || "services rendered"
    }"`
  );

  // In a real scenario, this would trigger the "Evader" module.
  // For now, we just acknowledge the debt.
  res.status(202).json({
    message:
      "Payment request observed and acknowledged. Deferment protocol initiated.",
    requestId: `req_${Date.now()}`,
  });
});

export default router;
