import { Injectable } from '@nestjs/common';

@Injectable()
export class CoffeesService {
  private coffees = [
    {
      id: 1,
      name: 'Arabica',
      brand: 'Brand A',
      flavors: ['chocolate', 'vanilla'],
    },
    {
      id: 2,
      name: 'Robusta',
      brand: 'Brand B',
      flavors: ['bitter', 'earthy'],
    },
  ];
  findAll(paginationQuery: any) {
    const { limit, offset } = paginationQuery;
    return this.coffees;
  }

  findOne(id: string) {
    return this.coffees.find((coffee) => coffee.id === +id);
  }

  create(coffeeData: any) {
    this.coffees.push({
      id: this.coffees.length + 1,
      ...coffeeData,
    });
    return coffeeData;
  }

  update(id: string, coffeeData: any) {
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id === +id);
    if (coffeeIndex > -1) {
      this.coffees[coffeeIndex] = {
        ...this.coffees[coffeeIndex],
        ...coffeeData,
      };
      return this.coffees[coffeeIndex];
    }
    return null;
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id === +id);
    if (coffeeIndex > -1) {
      const removedCoffee = this.coffees.splice(coffeeIndex, 1);
      return removedCoffee[0];
    }
    return null;
  }
}
