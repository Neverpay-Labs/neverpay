import { paymentRepository } from '../repositories/paymentRepository';
import { evader } from './evasion';

const CHECK_INTERVAL = 60 * 1000; // 1 minute
const VANISH_THRESHOLD = 5 * 60 * 1000; // 5 minutes

/**
 * Simulates a background process that periodically checks for
 * requests that are old enough to "vanish".
 */
class Scheduler {
  public start() {
    console.log('[Core/Scheduler]: Background scheduler initiated. The void watches.');
    setInterval(async () => {
      console.log('[Core/Scheduler]: Checking for requests to vanish...');
      const allRequests = await paymentRepository.findAll();
      const now = Date.now();
      
      for (const req of allRequests) {
        if (req.status === 'DEFERRED' && now - req.updatedAt > VANISH_THRESHOLD) {
          await evader.vanish(req.requestId);
        }
      }
    }, CHECK_INTERVAL);
  }
}

export const scheduler = new Scheduler();