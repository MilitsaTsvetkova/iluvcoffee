import { WithUuid } from '../../common/mixins/with-uuid.mixin/with-uuid.mixin';

export class Coffee {
  constructor(public name: string) {}
}

const CoffeeWithUuid = WithUuid(Coffee);
const coffee = new CoffeeWithUuid('Cappuccino');
console.log(coffee.name); // Cappuccino
