import { faker } from "@faker-js/faker";
import type { Product } from "../types";

const generateProducts = (count: number): Product[] => {
  const products: Product[] = [];
  for (let i = 1; i <= count; i++) {
    products.push({
      id: i,
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      brand: faker.company.name(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 1000, dec: 2 })),
      thumbnail: faker.image.url({ width: 200, height: 200 }),
      specs: {
        RAM: `${faker.number.int({ min: 4, max: 64 })}GB`,
        CPU: `Intel Core i${faker.number.int({ min: 3, max: 9 })}`,
      },
      manufacturedDate: faker.date
        .past({ years: 2 })
        .toISOString()
        .split("T")[0],
      likes: faker.number.int({ min: 0, max: 1000 }),

      relatedIds: [],
    });
  }
  return products;
};

export default generateProducts;
