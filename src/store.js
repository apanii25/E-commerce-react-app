
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Reducer/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
