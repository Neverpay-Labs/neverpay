import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY,
};

// Basic validation
if (!config.apiKey) {
  throw new Error('API_KEY is not defined in environment variables.');
}

export default config;