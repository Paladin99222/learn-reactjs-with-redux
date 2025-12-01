import { configureStore } from "@reduxjs/toolkit";

import { default as productReducer } from "../slices/productSlice";
import { default as cartReducer } from "../slices/cartSlice";
import { default as authReducer } from "../slices/authSlice";
import { default as likeReducer } from "../slices/likeSlice";
const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    like: likeReducer,
  },
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
