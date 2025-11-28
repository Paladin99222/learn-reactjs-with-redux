import { createSlice } from "@reduxjs/toolkit";
import type { CartItem } from "../types";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as CartItem[],
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push({ productId: action.payload.productId, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.productId === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.productId === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = CartSlice.actions;

export default CartSlice.reducer;
