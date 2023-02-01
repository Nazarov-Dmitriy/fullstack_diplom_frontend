import {
  configureStore
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userApi } from "src/servises/API/usersApi";
import modalReducer from '../features/modalSlice'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    modal: modalReducer
   },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;