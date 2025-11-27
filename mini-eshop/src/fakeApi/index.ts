import type { Product } from "../types";
import generateProducts from "./fakeProducts";

export const fetchProductsApi = async () => {
  return new Promise<Product[]>((resolve) => {
    setTimeout(() => {
      resolve(generateProducts(10));
    }, 2000);
  });
};
