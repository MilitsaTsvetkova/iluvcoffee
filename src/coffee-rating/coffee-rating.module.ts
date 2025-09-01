import { Module } from '@nestjs/common';
import { CoffeesModule } from '../coffees/coffees.module';
import { CoffeeRatingService } from './coffee-rating.service';
// import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [CoffeesModule],
  // DatabaseModule.register({})],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}

// //Dynamic Module
// @Module({
//   // Initial attempt at creating "CONNECTION" provider, and utilizing useValue for values */
//   // providers: [
//   //   {
//   //     provide: 'CONNECTION',
//   //     useValue: new DataSource({
//   //       type: 'postgres',
//   //       host: 'localhost',
//   //       port: 5432,
//   //     }).initialize(),
//   //   },
//   // ],
// })
// // Improved Dynamic Module way of creating CONNECTION provider
// export class DatabaseModule {
//   static register(options: DataSourceOptions): DynamicModule {
//     return {
//       module: DatabaseModule,
//       providers: [
//         {
//           provide: 'CONNECTION',
//           useValue: new DataSource(options).initialize(),
//         },
//       ],
//     };
//   }
// }
