import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { ConfigService, ConfigType } from '@nestjs/config';
import coffeeConfig from './config/coffee.config';

// Scopes
// Scope DEFAULT - This is assumed when NO Scope is entered like so: @Injectable() */
// @Injectable({ scope: Scope.DEFAULT })
// export class CoffeesService {}

// // -------------

// /**
//  * Scope TRANSIENT

//  * Transient providers are NOT shared across consumers.
//  * Each consumer that injects a transient provider
//  * will receive a new, dedicated instance of that provider.
//  */
// @Injectable({ scope: Scope.TRANSIENT })
// export class CoffeesService {}

// // Scope TRANSIENT with a Custom Provider
// {
//   provide: 'COFFEE_BRANDS',
//   useFactory: () => ['buddy brew', 'nescafe'],
//   scope: Scope.TRANSIENT // 👈
// }

// // -------------

// /**
//  * Scope REQUEST

//  * Request scope provides a new instance of the provider
//  * exclusively for each incoming request.
//  */
// @Injectable({ scope: Scope.REQUEST })
// export class CoffeesService {}

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,

    private readonly dataSource: DataSource,

    // private readonly configService: ConfigService,
    // @Inject(coffeeConfig.KEY)
    // private coffeesConfiguration: ConfigType<typeof coffeeConfig>,

    // @Inject('COFFEE_BRANDS') coffeesBrands: string[],
  ) {
    // const dbHost = this.configService.get<string>('database.host');
    // console.log(`Database Host: ${dbHost}`);
    // console.log(coffeesBrands);
    // console.log(coffeesConfiguration);
    // coffeesConfiguration.foo
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return await this.coffeeRepository.find({
      relations: {
        flavors: true,
      },
      take: limit ?? 10,
      skip: offset ?? 0,
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id: +id },
      relations: {
        flavors: true,
      },
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(coffeeData: CreateCoffeeDto) {
    const flavors = await Promise.all(
      coffeeData.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeeRepository.create({ ...coffeeData, flavors });

    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, coffeeData: UpdateCoffeeDto) {
    const flavors =
      coffeeData.flavors &&
      (await Promise.all(
        coffeeData.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...coffeeData,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);

    return this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
