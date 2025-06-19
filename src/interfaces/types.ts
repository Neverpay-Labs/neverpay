export type PaymentStatus = 'OBSERVED' | 'DEFERRED' | 'VANISHED';

export interface PaymentRequest {
  amount: number;
  creditor: string;
  description?: string;
}

export interface AcknowledgedRequest extends PaymentRequest {
  requestId: string;
  status: PaymentStatus;
  observedAt: number;
  updatedAt: number;
}