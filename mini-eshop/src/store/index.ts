import { configureStore } from "@reduxjs/toolkit";

import { default as productReducer } from "../slices/productSlice";
import { default as cartReducer } from "../slices/cartSlice";
import { default as authReducer } from "../slices/authSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
  },
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
