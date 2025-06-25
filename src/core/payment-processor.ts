import { paymentRepository } from '../repositories/paymentRepository';
import { PaymentRequest } from './payment-request';
import { auditLogger } from './audit-trail';

/**
 * The PaymentProcessor is responsible for handling the initial
 * acceptance and processing of a payment request.
 */
class PaymentProcessor {
  public async process(requestData: Omit<PaymentRequest, 'requestId' | 'status' | 'createdAt' | 'updatedAt'>): Promise<PaymentRequest> {
    const newRequest: PaymentRequest = {
      ...requestData,
      requestId: this.generateUniqueId(),
      status: 'DEFERRED',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    console.log(`[Core/PaymentProcessor]: Processing new request: ${newRequest.requestId}`);
    await paymentRepository.save(newRequest);
    auditLogger.log('info', `New payment request ${newRequest.requestId} created and deferred.`);

    return newRequest;
  }

  private generateUniqueId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }
}

export const paymentProcessor = new PaymentProcessor();