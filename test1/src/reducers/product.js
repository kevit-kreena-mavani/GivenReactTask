import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useProduct from "../hooks/useProduct";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (payload) => {
    // const response = await fetch(
    //   `https://fakestoreapi.com/products?limit=${payload}`
    // );
     const response = await fetch("https://dummyjson.com/products?limit=100");
    return response.json();
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    searchedProduct: [],
    clickedProduct: {},
    status: "idle",
    error: "",
  },
  reducers: {
    findProduct(state, payload) {
      const item = state.products.find(
        (Product) => Product.id === payload.payload
      );
      if (item) {
        state.clickedProduct = item;
      }
    },

    SearchProduct(state, payload) {
      const items = state.products.filter((product) =>
        product.title.toLowerCase().includes(payload.payload)
      );

      if (items) {
        state.searchedProduct = items;
      }
      const checkArray = items.map((item) =>
        item.title.toLowerCase().includes(payload.payload)
      );
      if (checkArray.every((item) => item === false)) {
        state.error = "Items not Found";
      } else {
        state.error = "";
      }
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = "success";
      state.products = state.products.concat(action.payload);
      //state.hasMoreData = action.payload.length > 0;
      // state.products = action.payload.products
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});
export const ProductActions = ProductSlice.actions;
export default ProductSlice.reducer;
