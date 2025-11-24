import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongodb_uri: process.env.MONGODB_URI,
  cors_origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
};