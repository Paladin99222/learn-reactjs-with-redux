export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

export interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}
