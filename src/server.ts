import { Server } from 'http';
import app from './app';
import config from './config';
import logger from './lib/logger';
import { scheduler } from './core/scheduler';

let server: Server;

try {
  server = app.listen(config.port, () => {
    logger.info(`Server running in ${config.env} mode on port ${config.port}.`);
    scheduler.start();
  });
} catch (error) {
  logger.fatal(error, 'Failed to start server');
  process.exit(1);
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed. The void is quiet.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.fatal(error, 'UNCAUGHT EXCEPTION! Shutting down...');
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', (reason: Error) => {
  throw reason; // Will be caught by uncaughtException handler
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received.');
  exitHandler();
});

process.on('SIGINT', () => {
  logger.info('SIGINT received.');
  exitHandler();
});