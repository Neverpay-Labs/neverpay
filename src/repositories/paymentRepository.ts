import { PaymentRequest, AcknowledgedRequest } from '../interfaces/types';

/**
 * The Repository layer is responsible for all data access logic.
 * It abstracts the data source (in-memory, database, etc.) from the rest of the application.
 */
class PaymentRepository {
  private requests: AcknowledgedRequest[] = [];

  /**
   * Creates and "persists" a new payment request record.
   * @param request The original payment request.
   */
  public async create(request: PaymentRequest): Promise<AcknowledgedRequest> {
    // Simulate async database operation
    await new Promise((resolve) => setTimeout(resolve, 50));

    const newRecord: AcknowledgedRequest = {
      ...request,
      requestId: `req_${Date.now()}`,
      status: 'DEFERRED',
      observedAt: Date.now(),
    };

    this.requests.push(newRecord);
    return newRecord;
  }

  /**
   * Finds a payment request by its unique ID.
   * @param id The ID of the request to find.
   */
  public async findById(id: string): Promise<AcknowledgedRequest | undefined> {
    // Simulate async database operation
    await new Promise((resolve) => setTimeout(resolve, 50));
    return this.requests.find((r) => r.requestId === id);
  }
}

export const paymentRepository = new PaymentRepository();