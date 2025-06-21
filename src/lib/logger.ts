import pino from 'pino';
import config from '../config';

const logger = pino({
  level: config.env === 'development' ? 'debug' : 'info',
  // prettyPrint is handled by pino-pretty in dev script
});

export default logger;