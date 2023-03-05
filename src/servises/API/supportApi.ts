import {
  createApi
} from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";

export interface CreateSupport {
  user: string;
  text: string;
}



export const supportApi = createApi({
  reducerPath: "supportApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    postSupportClient: builder.mutation({
      query(body: CreateSupport) {
        return {
          url: `client/support-requests/`,
          method: 'POST',
          body,
        }
      },
    }),

    // getHotelRoom: builder.query({
    //   query(id) {
    //     return {
    //       url: `common/hotel-rooms/${id}`,
    //     }
    //   },
    // }),

  }),
});


export const {
  usePostSupportClientMutation,
  // useGetHotelRoomQuery,
} = supportApi;


