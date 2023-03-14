import {
  configureStore
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { hotelApi } from "src/servises/API/hotelApi";
import { userApi } from "src/servises/API/usersApi";
import { reservationApi } from "src/servises/API/reservationApi";
import modalReducer from '../features/modalSlice'
import userReducer from '../features/userSlice'
import hotelReducer from '../features/hotelSlice'
import supportRequstReducer from '../features/supportRequstSlice'
import { hotelRoomApi } from "src/servises/API/hotelRoomApi";
import { supportApi } from "src/servises/API/supportApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [hotelRoomApi.reducerPath]: hotelRoomApi.reducer,
    [reservationApi.reducerPath]: reservationApi.reducer,
    [supportApi.reducerPath]: supportApi.reducer,
    modal: modalReducer,
    user: userReducer,
    hotel: hotelReducer,
    supportRequst: supportRequstReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, hotelApi.middleware, hotelRoomApi.middleware, reservationApi.middleware ,supportApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;