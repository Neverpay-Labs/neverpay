export interface PaymentRequest {
    amount: number;
    creditor: string;
    description?: string;
}

export interface AcknowledgedRequest extends PaymentRequest {
    requestId: string;
    status: 'OBSERVED' | 'DEFERRED' | 'VANISHED';
    observedAt: number;
}