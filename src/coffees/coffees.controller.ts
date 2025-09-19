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
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { ActiveUser } from '../iam/decorators/active-user.decorator';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { Permission } from '../iam/authorization/permission.type';
import { Permissions } from '../iam/authorization/decorators/permissions.decorator';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}
  @Get()
  findAll(
    @Query() paginationQuery: any,
    @ActiveUser('email') user: ActiveUserData,
  ) {
    console.log(user);
    return this.coffeeService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const coffee = this.coffeeService.findOne(id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
  }
  @Roles(Role.Admin)
  @Permissions(Permission.CreateCoffee)
  @Post()
  create(@Body() body: CreateCoffeeDto) {
    return this.coffeeService.create(body);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateCoffeeDto) {
    return this.coffeeService.update(id, body);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeService.remove(id);
  }
}
