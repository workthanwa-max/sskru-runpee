import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger, LoggerErrorInterceptor, PinoLogger } from 'nestjs-pino';
import { AppModule } from './app';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ConfigType } from './common/types/config.type';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService<ConfigType>);
    const pLogger = await app.resolve(PinoLogger);
    const logger = app.get(Logger);

    app.useLogger(app.get(Logger));
    app.useGlobalInterceptors(new LoggerErrorInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter(pLogger));
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: false,
        forbidNonWhitelisted: true,
        disableErrorMessages: config.get('app.nodeEnv', { infer: true }) === 'production',
      }),
    );

    app.enableCors({
      origin: config.get('app.corsOrigins', { infer: true }),
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
      ],
    });

    const port = config.getOrThrow('app.port', { infer: true });
    const host = config.getOrThrow('app.host', { infer: true });

    await app.listen(port, host);

    logger.log(`🚀 Application is running on: http://${host}:${port}`);
    logger.log(`🏥 Health Check: http://${host}:${port}/healthz`);
    logger.log(`📊 Environment: ${config.get('app.nodeEnv', { infer: true })}`);

    process.on('SIGTERM', () => {
      logger.log('SIGTERM received, shutting down gracefully');
      void app.close().then(() => process.exit(0));
    });

    process.on('SIGINT', () => {
      logger.log('SIGINT received, shutting down gracefully');
      void app.close().then(() => process.exit(0));
    });
  } catch (error) {
    const logger = new PinoLogger({ renameContext: 'StartingApplication' });
    logger.error(error, 'Error starting application');
    process.exit(1);
  }
}

process.on('unhandledRejection', (reason, promise) => {
  const logger = new PinoLogger({ renameContext: 'UnhandledRejection' });
  logger.error({ promise, 'reason:': reason }, 'Unhandled Rejection at:');
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  const logger = new PinoLogger({ renameContext: 'UncaughtException' });
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

void bootstrap();
