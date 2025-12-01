export interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  brand: string;
  price: number;
  thumbnail?: string; // main image
  specs?: Record<string, string>; // e.g., { RAM: "16GB", CPU: "i7" }
  manufacturedDate?: string; // e.g., "2025-01-15"
  likes?: number; // optional like count
  relatedIds?: number[]; // optional related products
}

export interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

export interface CartItem {
  productId: number;
  quantity: number;
}
export interface CartState {
  items: CartItem[];
}

export interface User {
  id: number;
  username: string;
  password: string;
  likes: number[]; // array of liked product IDs
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}
