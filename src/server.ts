import app from './app';
import config from './config';
import { scheduler } from './core/scheduler';

const server = app.listen(config.port, () => {
  console.log(
    `Server running in ${config.env} mode on port ${config.port}. Don't expect a payment.`,
  );
  
  // Start the background job simulator
  scheduler.start();
});

// Graceful shutdown logic
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});