import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { HttpClientModule } from './http-client/http-client.module';

@Module({
  imports: [
    CoffeesModule,
    HttpClientModule.register({ baseUrl: 'https://api.sample.com' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
