import { Server } from 'http';
import app from './app';
import config from './config';
import { scheduler } from './core/scheduler';

let server: Server;

// Start the server
try {
  server = app.listen(config.port, () => {
    console.log(
      `Server running in ${config.env} mode on port ${config.port}. Don't expect a payment.`,
    );
    // Start the background job simulator
    scheduler.start();
  });
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}


// Graceful shutdown logic
const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed. The void is quiet.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...', error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('SIGTERM', () => {
  console.info('SIGTERM received.');
  exitHandler();
});

process.on('SIGINT', () => {
  console.info('SIGINT received.');
  exitHandler();
});