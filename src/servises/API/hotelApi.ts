import {
  createApi
} from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";

export interface AddHotelRequest {
  title: string;
  description: string;
}

export interface UpdateHotelRequest {
  id: string | undefined;
  body: {
    title: string;
    description: string;
    imageFiles: File[];
    imagesSrc:string[];
  }
}


export const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    postAddHotel: builder.mutation({
      query(body: AddHotelRequest) {
        return {
          url: `admin/hotels/`,
          method: 'POST',
          body,
        }
      },
    }),

    updateHotel: builder.mutation({
      query(data: UpdateHotelRequest) {   
        const formData = new FormData();
        formData.append('title', data.body.title);
        formData.append('description', data.body.description);
        formData.append('imagesSrc', data.body.imagesSrc.join());
        for (let key of data.body.imageFiles) {
          formData.append('files', key, key.name);
        }

             return {
          url: `admin/hotels/:${data.id}`,
          method: 'PUT',
          body: formData,
        }
      },
    }),

    getHotel: builder.query({
      query(id) {
        return {
          url: `admin/hotels/${id}`,
        }
      },
    }),


    getSearchAdminHotel: builder.query({
      query: (arg) => {
        const { title, limit, offset } = arg;
        return {
          url: 'admin/hotels/',
          params: { title, limit, offset },
        };
      },
    }),

  }),
});


export const {
  usePostAddHotelMutation,
  useGetSearchAdminHotelQuery,
  useGetHotelQuery,
  useUpdateHotelMutation,
} = hotelApi;


