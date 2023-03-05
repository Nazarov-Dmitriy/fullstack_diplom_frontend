import {
  createApi
} from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";

export interface AddReservationRequest {
  userId: string,
  hotel: string,
  roomId: string,
  dateStart: Date,
  dateEnd: Date,
}


export const reservationApi = createApi({
  reducerPath: "reservationApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    postAddReservation: builder.mutation({
      query(body: AddReservationRequest) {
        return {
          url: `client/reservations`,
          method: 'POST',
          body,
        }
      },
    }),

    deleteReservation: builder.mutation({
      query(id) {
        return {
          url: `client/reservations/${id}`,
          method: 'DELETE',
        }
      },
    }),

    deleteManagerReservation: builder.mutation({
      query(id) {
        return {
          url: `manager/reservations/${id}`,
          method: 'DELETE',
        }
      },
    }),

    getReservationHotelRoom: builder.query({
      query(id) {
        return {
          url: `client/reservations/hotel-room/${id}`,
        }
      },
    }),

    getReservationClient: builder.query({
      query(id) {
        return {
          url: `/client/reservations/${id}`,
        }
      },
    }),

    getSearchManagerRevertions: builder.query({
      query: (arg) => {
        const { userId, limit, offset } = arg;
        return {
          url: 'manager/reservations/',
          params: { userId, limit, offset },
        };
      },
    }),

  }),
});


export const {
  usePostAddReservationMutation,
  useGetReservationHotelRoomQuery,
  useGetReservationClientQuery,
  useDeleteReservationMutation,
  useGetSearchManagerRevertionsQuery,
  useDeleteManagerReservationMutation,
} = reservationApi;


