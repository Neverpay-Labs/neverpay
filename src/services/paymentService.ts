import { PaymentRequest, AcknowledgedRequest } from '../interfaces/types';
import { paymentRepository } from '../repositories/paymentRepository';

class PaymentService {
  /**
   * The service layer contains the core business logic.
   * It orchestrates calls to the repository layer.
   * @param request The payment request to observe.
   */
  public async observe(
    request: PaymentRequest,
  ): Promise<AcknowledgedRequest> {
    console.log(
      `[Service/Observer]: Business logic processing payment for ${request.amount} to ${request.creditor}.`,
    );

    // Delegate persistence to the repository layer
    const acknowledgedRequest = await paymentRepository.create(request);

    console.log(
      `[Service/Evader]: Request ${acknowledgedRequest.requestId} has been successfully deferred.`,
    );

    return acknowledgedRequest;
  }

  /**
   * Retrieves the status and details of a specific request.
   * @param requestId The ID of the request to check.
   */
  public async getStatus(
    requestId: string,
  ): Promise<AcknowledgedRequest | null> {
    const request = await paymentRepository.findById(requestId);
    if (!request) {
      return null;
    }
    return request;
  }
}

export const paymentService = new PaymentService();