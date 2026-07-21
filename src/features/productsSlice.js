import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

// createAsyncThunk generates an action creator that runs an async function
// and automatically dispatches pending/fulfilled/rejected actions around it.
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axiosClient.get("/products");
    // Fake Store API returns { id, title, price, image, ... }.
    // Map `title` -> `name` so the rest of the app (ProductCard, cartSlice)
    // can keep using the `name` field it already expects.
    return response.data.map((item) => ({
      id: item.id,
      name: item.title,
      price: item.price,
      image: item.image,
    }));
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
