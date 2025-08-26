import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from './typeormconfigservice.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
  ],
  providers: [TypeOrmConfigService],
})
export class DatabaseModule {}
