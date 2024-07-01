import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";

const persistConfig = {
  key: "Webapplication",
  storage,
}

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    Cart: persistedCartReducer,
    Auth: persistedAuthReducer,
  }
});
export const persistor = persistStore(store);

