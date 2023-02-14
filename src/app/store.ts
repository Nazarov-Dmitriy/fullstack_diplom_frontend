import {
  configureStore
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { hotelApi } from "src/servises/API/hotelApi";
import { userApi } from "src/servises/API/usersApi";
import modalReducer from '../features/modalSlice'
import userReducer from '../features/userSlice'
import hotelReducer from '../features/hotelSlice'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    modal: modalReducer,
    user: userReducer,
    hotel: hotelReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, hotelApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;