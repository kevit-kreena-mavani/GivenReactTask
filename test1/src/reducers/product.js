import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
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
      const checkArray = items.map(item => item.title.toLowerCase().includes(payload.payload));
      if(checkArray.every(item => item === false)){
        state.error = "Items not Found";
      }else{
        state.error =""
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
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});
export const ProductActions = ProductSlice.actions;
export default ProductSlice.reducer;
