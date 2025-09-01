import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const DEFAULT_MAX_QUERY_EXECUTION_TIME = 2 * 1000; // 2 second maxQueryExecutionTime

export const getConfig = (
  configService: ConfigService,
): PostgresConnectionOptions => ({
  type: 'postgres',
  host: configService.getOrThrow<string>('DATABASE_HOST'),
  port: configService.getOrThrow<number>('DATABASE_PORT'),
  username: configService.getOrThrow<string>('DATABASE_USER'),
  password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
  database: configService.getOrThrow<string>('DATABASE_NAME'),
  synchronize: true,
  migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
  migrationsRun: configService.get<string>('NODE_ENV') !== 'production',
  logging: configService.get<boolean>('DATABASE_LOGGING'),
  maxQueryExecutionTime:
    configService.get<number>('MAX_QUERY_EXECUTION_TIME') ??
    DEFAULT_MAX_QUERY_EXECUTION_TIME,
  isolateWhereStatements: true,
});
