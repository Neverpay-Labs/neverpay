import { paymentRepository } from '../repositories/paymentRepository';

/**
 * The Evader module is responsible for the core "disappearance" logic.
 */
class Evader {
  public async vanish(requestId: string): Promise<void> {
    const request = await paymentRepository.findById(requestId);
    if (request && request.status === 'DEFERRED') {
      console.log(`[Core/Evader]: Request ${requestId} has met the conditions for vanishing.`);
      await paymentRepository.updateStatus(requestId, 'VANISHED');
      console.log(`[Core/Evader]: Request ${requestId} has successfully vanished from the active ledger.`);
    }
  }
}

export const evader = new Evader();