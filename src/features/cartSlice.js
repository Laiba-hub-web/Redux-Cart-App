import { createSlice } from "@reduxjs/toolkit";

// The cart's initial state: an empty array of items.
// Each item, once added, looks like: { id, name, price, image, quantity }
const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Adds a product to the cart, or increments its quantity if it's already there.
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // Redux Toolkit uses Immer internally, so this "mutation" is safe --
        // Immer converts it into an immutable update behind the scenes.
        state.items.push({ ...product, quantity: 1 });
      }
    },

    // Removes an item from the cart entirely, regardless of its quantity.
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },

    // Increments the quantity of a specific cart item by 1.
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.id === productId);
      if (item) item.quantity += 1;
    },

    // Decrements the quantity of a specific cart item by 1.
    // If quantity would drop to 0, the item is removed instead of showing "0".
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== productId);
      }
    },

    // Empties the cart entirely -- dispatched once an order is placed.
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
