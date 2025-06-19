import {
  PaymentRequest,
  AcknowledgedRequest,
  PaymentStatus,
} from '../interfaces/types';

class PaymentRepository {
  private requests: AcknowledgedRequest[] = [];

  public async create(request: PaymentRequest): Promise<AcknowledgedRequest> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const now = Date.now();
    const newRecord: AcknowledgedRequest = {
      ...request,
      requestId: `req_${now}`,
      status: 'DEFERRED',
      observedAt: now,
      updatedAt: now,
    };
    this.requests.push(newRecord);
    return newRecord;
  }

  public async findById(id: string): Promise<AcknowledgedRequest | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return this.requests.find((r) => r.requestId === id);
  }

  public async findAll(): Promise<AcknowledgedRequest[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return [...this.requests];
  }

  public async updateStatus(
    id: string,
    status: PaymentStatus,
  ): Promise<AcknowledgedRequest | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const requestIndex = this.requests.findIndex((r) => r.requestId === id);
    if (requestIndex === -1) {
      return undefined;
    }
    this.requests[requestIndex].status = status;
    this.requests[requestIndex].updatedAt = Date.now();
    return this.requests[requestIndex];
  }
}

export const paymentRepository = new PaymentRepository();