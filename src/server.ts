import { Server } from 'http';
import app from './app';
import config from './config';
import connectDB from './config/database';

let server: Server;

async function main() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start server
    server = app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
      console.log(`🌍 Environment: ${config.node_env}`);
      console.log(`📡 CORS enabled for: ${config.cors_origin}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (error: Error) => {
  console.error('🔴 Unhandled Rejection:', error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  console.error('🔴 Uncaught Exception:', error);
  process.exit(1);
});

// Start the application
main();