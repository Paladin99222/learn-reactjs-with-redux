import type { Product } from "../types";

export const fetchProductsApi = async () => {
  return new Promise<Product[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Product 1",
          description: "Description for product 1",
          price: 100,
        },
        {
          id: 2,
          title: "Product 2",
          description: "Description for product 2",
          price: 200,
        },
      ]);
    }, 2000);
  });
};
