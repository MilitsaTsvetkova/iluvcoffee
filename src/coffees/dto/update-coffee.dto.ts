import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {
  // This class will inherit all properties from CreateCoffeeDto
  // and make them optional for updates.
}
