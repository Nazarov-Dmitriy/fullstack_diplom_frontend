import {
  configureStore
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { hotelApi } from "src/servises/API/hotelApi";
import { userApi } from "src/servises/API/usersApi";
import modalReducer from '../features/modalSlice'
import userReducer from '../features/userSlice'
import hotelReducer from '../features/hotelSlice'
import { hotelRoomApi } from "src/servises/API/hotelRoomApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [hotelRoomApi.reducerPath]: hotelRoomApi.reducer,
    modal: modalReducer,
    user: userReducer,
    hotel: hotelReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, hotelApi.middleware , hotelRoomApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;