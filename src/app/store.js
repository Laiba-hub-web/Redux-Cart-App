import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import productsReducer from "../features/productsSlice";
import { loadCartState, saveCartState } from "./localStorage";

// Rehydrate the cart from localStorage before the store is even created.
// If nothing is stored yet (or it's corrupted), this is undefined and
// Redux Toolkit falls back to cartSlice's own initialState automatically.
const persistedCartState = loadCartState();

// configureStore sets up the store with good defaults out of the box:
// Redux DevTools support, redux-thunk middleware, and a dev-only check
// that catches accidental state mutations outside reducers.
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
  preloadedState: persistedCartState ? { cart: persistedCartState } : undefined,
});

// Persist the cart slice to localStorage after every dispatch that changes it.
// Debounced so a burst of clicks (e.g. holding the quantity "+" button)
// writes to disk once, not once per click.
let saveTimeoutId;
let lastSavedCart = store.getState().cart;

store.subscribe(() => {
  const currentCart = store.getState().cart;
  if (currentCart === lastSavedCart) return; // only the cart slice changing is worth a write
  lastSavedCart = currentCart;

  clearTimeout(saveTimeoutId);
  saveTimeoutId = setTimeout(() => {
    saveCartState(currentCart);
  }, 300);
});
