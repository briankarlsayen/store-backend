import { faker } from '@faker-js/faker';
import { Product } from '../../types'
export const productList: Product[] = [];

const fakeRating = () => {
  const precision = 100; // 2 decimals
  const rate = Math.floor(Math.random() * (5 * precision - 1 * precision) + 1 * precision) / (1*precision);
  const count = Math.floor(Math.random() * (1000 - 0) + 0);
  return {
    rate,
    count,
  }
}

export function createRandomProduct(): Product {
  return {
    id: faker.datatype.uuid(),
    title: faker.commerce.product(),
    price: Number(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    image: faker.image.fashion(),
    rate: fakeRating().rate,
    count: fakeRating().count
  };
}

Array.from({ length: 10 }).forEach(() => {
  productList.push(createRandomProduct());
});