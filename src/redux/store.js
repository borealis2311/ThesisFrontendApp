import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";

const persistCartConfig = {
  key: "Cart",
  storage,
}

const persistAuthConfig = {
  key: "Auth",
  storage,
}

const persistedCartReducer = persistReducer(persistCartConfig, cartReducer);
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

export const store = configureStore({
  reducer: {
    Cart: persistedCartReducer,
    Auth: persistedAuthReducer,
  }
});
export const persistor = persistStore(store);

