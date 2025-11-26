import { configureStore } from "@reduxjs/toolkit";

import { default as productReducer } from "../slices/productSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
  },
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
