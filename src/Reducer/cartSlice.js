// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    incrementItemQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      }
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    decrementItemQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity, incrementItemQuantity, decrementItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
