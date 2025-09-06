import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  RequestTimeoutException,
  UseInterceptors,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CircuitBreakerInterceptor } from '../common/interceptors/circuit-breaker/circuit-breaker.interceptor';

@UseInterceptors(CircuitBreakerInterceptor)
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}
  @Get()
  findAll() {
    console.log('🦊 "findAll" executed');
    throw new RequestTimeoutException('💥 Error!'); // 👈
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const coffee = this.coffeeService.findOne(id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
  }

  @Post()
  create(@Body() body: CreateCoffeeDto) {
    return this.coffeeService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateCoffeeDto) {
    return this.coffeeService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeService.remove(id);
  }
}
