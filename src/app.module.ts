import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { AlarmsModule } from './alarms/application/alarms.module';

@Module({
  imports: [CoffeesModule, AlarmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
