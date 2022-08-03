import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token : '',
  isLoggedIn : false ,
  userData : [],
};
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    loggingIn(state , payload) {
      state.isAuthenticated = true;
      state.userData = payload.payload ;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    loggedIn(state ){
      state.isAuthenticated = true; 
    },
    updateUserData(state , payload){
      const {payload : data} = payload ;
      state.userData.name = data.name ; 
      state.userData.email = data.email ; 
      state.userData.address = data.address ; 
      state.userData.mobileNumber = data.mobileNumber ; 
    }, 
    discardChange(state){
      state.userData = state.userData;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
