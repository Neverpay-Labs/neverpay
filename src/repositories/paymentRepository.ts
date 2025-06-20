import {
  PaymentRequest as IPaymentRequest,
  AcknowledgedRequest,
  PaymentStatus,
} from '../interfaces/types';
import { prisma } from '../lib/prisma';
import { PaymentRequest } from '@prisma/client';

class PaymentRepository {
  /**
   * Creates and persists a new payment request record in the database.
   */
  public async create(
    request: IPaymentRequest,
  ): Promise<PaymentRequest> {
    const now = new Date();
    const requestId = `req_${now.getTime()}`;

    const newRecord = await prisma.paymentRequest.create({
      data: {
        ...request,
        requestId: requestId,
        status: 'DEFERRED',
      },
    });

    return newRecord;
  }

  /**
   * Finds a payment request by its unique requestId.
   */
  public async findById(
    id: string,
  ): Promise<PaymentRequest | null> {
    return prisma.paymentRequest.findUnique({ where: { requestId: id } });
  }

  /**
   * Retrieves all payment requests from the database.
   */
  public async findAll(): Promise<PaymentRequest[]> {
    return prisma.paymentRequest.findMany({
      orderBy: { observedAt: 'desc' },
    });
  }

  /**
   * Updates the status of a specific payment request.
   */
  public async updateStatus(
    id: string,
    status: PaymentStatus,
  ): Promise<PaymentRequest | null> {
    return prisma.paymentRequest.update({
      where: { requestId: id },
      data: { status },
    });
  }
}

export const paymentRepository = new PaymentRepository();