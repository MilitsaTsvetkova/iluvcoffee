import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { DataSourceModule } from './data-source/data-source.module';
import { UsersModule } from './users/users.module';
import { ContextIdFactory } from '@nestjs/core';
import { AggregateByTenantContextIdStrategy } from './core/aggregate-by-tenant.strategy';

ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());
@Module({
  imports: [CoffeesModule, DataSourceModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
