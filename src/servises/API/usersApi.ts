import {
  createApi
} from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string,
  password: string,
  name: string,
  contactPhone: string
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    postRegister: builder.mutation({
      query(body: RegisterRequest) {
        return {
          url: `client/register`,
          method: 'POST',
          body,
        }
      },
    }),
    postLogin: builder.mutation({
      query(body: LoginRequest) {
        return {
          url: `auth/login`,
          method: 'POST',
          body,
        }
      },
    }),
    //
    getSss: builder.query({
      query: (url) => ({
        url: `${url}`,
      })
    }),
  }),
});

export const {
  usePostRegisterMutation,
  usePostLoginMutation,
  //
  useGetSssQuery
} = userApi;


