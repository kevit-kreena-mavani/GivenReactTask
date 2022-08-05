import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, payload) {
      const { payload: item } = payload;
      const cartItem = {
        id: item.id,
        quantity: 1,
        title: item.title,
        price: item.price,
      };
      state.totalAmount = (
        parseFloat(state.totalAmount) + parseFloat(item.price)
      ).toFixed(2);

      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === cartItem.id
      );

      const existingItem = state.cartItems[existingItemIndex];

      if (existingItem) {
        existingItem.quantity++;
        state.totalQuantity++;
      } else {
        state.cartItems= [...state.cartItems , cartItem];
        state.totalQuantity++;
      }
    },
    removeFromCart(state, payload) {
      const { payload: product } = payload;
      state.totalQuantity--;

      state.totalAmount = (
        parseFloat(state.totalAmount) - parseFloat(product.price)
      ).toFixed(2);

      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === product.id
      );

      const existingItem = state.cartItems[itemIndex];

      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        
      } else if (existingItem.quantity === 1) {

        state.cartItems = state.cartItems.filter(
          (item) => item.id !== product.id
        );

      }
    },
    clearCart(state){
      state.cartItems = [];
      state.totalAmount = 0 ; 
      state.totalQuantity = 0 ; 
    }
    
  },
});
export const CartActions = CartSlice.actions;
export default CartSlice.reducer;
