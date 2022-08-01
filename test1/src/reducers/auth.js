import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token : '',
  isLoggedIn : false ,
};
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    loggingIn(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    loggedIn(state){
      state.isAuthenticated = true; 
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
