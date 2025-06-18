import app from './app';
import config from './config';

const server = app.listen(config.port, () => {
  console.log(
    `Server running in ${config.env} mode on port ${config.port}. Don't expect a payment.`,
  );
});

// Graceful shutdown logic
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});