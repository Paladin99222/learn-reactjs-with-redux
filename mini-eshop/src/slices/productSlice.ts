import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { Product } from "../types";

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",

  async () => {
    const data = await fetch("http://localhost:5000/products");
    return (await data.json()) as Product[];
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [] as Product[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    clearProducts: (state) => {
      state.items = [];
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
