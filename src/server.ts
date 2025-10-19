import colors from 'colors';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';
import seedSuperAdmin from './app/DB';

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
      errorLogger.error('Uncaught Exception Detected', error);
      process.exit(1);
});

async function main() {
      try {
            // Connect to MongoDB
            await mongoose.connect(config.database_url as string);
            logger.info(colors.green('🚀 Database connected successfully'));

            // Seed super admin
            await seedSuperAdmin();

            // Get port from config
            const port = typeof config.port === 'number' ? config.port : Number(config.port);

            // Start Express server
            const server = app.listen(port, () => {
                  logger.info(colors.yellow(`♻️  Application listening on port: ${port}`));
            });

            // Handle unhandled promise rejections
            process.on('unhandledRejection', (error) => {
                  if (server) {
                        server.close(() => {
                              errorLogger.error('Unhandled Rejection Detected', error);
                              process.exit(1);
                        });
                  } else {
                        process.exit(1);
                  }
            });

            // Graceful shutdown on SIGTERM
            process.on('SIGTERM', () => {
                  logger.info('SIGTERM received. Shutting down gracefully...');
                  if (server) server.close();
            });
      } catch (error) {
            errorLogger.error(colors.red('🤢 Failed to connect to Database or start server'), error);
            process.exit(1);
      }
}

main();
