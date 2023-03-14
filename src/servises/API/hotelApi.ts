import {
  createApi
} from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";

export interface AddHotelRequest {
  title: string;
  description: string;
}

export interface UpdateHotelRequest {
  id: string;
  body: {
    title: string;
    description: string;
    imageFiles: File[];
    imagesSrc: string[];
  }
}

export interface CreateHotelRoomRequest {
  id: string;
  description: string;
  imageFiles: File[];
}

export interface UpdateHotelRoomRequest {
  id: string;
  hotelId:string;
  description: string;
  imageFiles: File[];
  images: string[];
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

    postCreateHotelRoom: builder.mutation({
      query(data: CreateHotelRoomRequest) {
        const formData = new FormData();
        formData.append('id', data.id);
        formData.append('description', data.description);
        for (let key of data.imageFiles) {
          formData.append('files', key, key.name);
        }

        return {
          url: `admin/hotel-rooms/`,
          method: 'POST',
          body: formData,
        }
      },
    }),

    updateHotelRoom: builder.mutation({
      query(data: UpdateHotelRoomRequest) {
        const formData = new FormData();
        formData.append('description', data.description);
        formData.append('id', data.hotelId);
        formData.append('images', data.images.join());
        for (let key of data.imageFiles) {
          formData.append('files', key, key.name);
        }

        return {
          url: `admin/hotels-room/${data.id}`,
          method: 'PUT',
          body: formData,
        }
      },
    }),

    getHotelAdmin: builder.query({
      query(id) {
        return {
          url: `admin/hotels/${id}`,
        }
      },
    }),

    getHotel: builder.query({
      query(id) {
        return {
          url: `common/hotel/${id}`,
        }
      },
    }),

    getHotelRoom: builder.query({
      query(id) {
        return {
          url: `admin/hotels-room/${id}`,
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

    getSearchAdminHotelRooms: builder.query({
      query: (arg) => {
        const { id, limit, offset } = arg;
        return {
          url: 'admin/hotel-rooms',
          params: { id, limit, offset },
        };
      },
    }),

    getSearchHotelRooms: builder.query({
      query: (arg) => {
        const { id, limit, offset, startDate, endDate, isEnabled } = arg;
        return {
          url: 'common/hotel-rooms',
          params: { id, limit, offset, startDate, endDate, isEnabled },
        };
      },
    }),

  }),
});


export const {
  usePostAddHotelMutation,
  useGetSearchAdminHotelQuery,
  useGetSearchAdminHotelRoomsQuery,
  useGetSearchHotelRoomsQuery,
  useGetHotelAdminQuery,
  useGetHotelQuery,
  useGetHotelRoomQuery,
  useUpdateHotelMutation,
  usePostCreateHotelRoomMutation,
  useUpdateHotelRoomMutation
} = hotelApi;


