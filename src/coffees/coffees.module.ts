import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { Connection } from 'typeorm';
// import { COFFEE_BRANDS } from './coffees.constants';

// class ConfigClass {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}

// @Injectable()
// export class CoffeeBrandsFactory {
//   create() {
//     return ['buddy brew', 'nescafe'];
//   }
// }

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    // {
    //   provide: COFFEE_BRANDS,
    //   useFactory: (coffeeBrandsFactory: CoffeeBrandsFactory) =>
    //     coffeeBrandsFactory.create(),
    //   inject: [CoffeeBrandsFactory],
    // }, example of factory based providers
    // {
    //   provide: ConfigClass,
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? DevelopmentConfigService
    //       : ProductionConfigService,
    // }, example of class based providers
    // Asynchronous "useFactory" (async provider example)
    // {
    //   provide: 'COFFEE_BRANDS',
    //   // Note "async" here, and Promise/Async event inside the Factory function
    //   // Could be a database connection / API call / etc
    //   // In our case we're just "mocking" this type of event with a Promise
    //   useFactory: async (connection: Connection): Promise<string[]> => {
    //     // const coffeeBrands = await connection.query('SELECT * ...');
    //     const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
    //     return coffeeBrands;
    //   },
    //   inject: [Connection],
    // },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}

// export const MockCoffeeService = {};

// { provide: CoffeesService, useValue: MockCoffeeService }, value based providers
// { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] }, // example of non-class based provider tokens
