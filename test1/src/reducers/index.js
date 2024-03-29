import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import AuthReducer from "./auth";
import ProductReducer from "./product";
import CartReducer from "./cart";

const persistConfig = {
  key: "root",
  storage,
};

// const persistedReducer = persistReducer(persistConfig, AuthReducer);

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, AuthReducer),
    product: ProductReducer,
    cart: CartReducer,
  },
});

export const persistor = persistStore(store);
export default store;
