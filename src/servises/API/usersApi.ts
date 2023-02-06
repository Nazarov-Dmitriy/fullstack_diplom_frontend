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
export interface RegisterAdmin {
  email: string,
  password: string,
  name: string,
  contactPhone: string,
  role: string
}
export interface SearchRequest {
  email: string,
  contactPhone: string,
  name: string,
  offset: string,
  limit: string,
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    postRegister: builder.mutation({
      query(body: RegisterRequest) {
        return {
          url: `client/register`,
          credentials: 'include',
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
    postRegisterAdminUsers: builder.mutation({
      query(body: RegisterAdmin) {
        return {
          url: `admin/users-create/`,
          method: 'POST',
          body,
        }
      },
    }),
    postLogout: builder.mutation({
      query() {
        return {
          url: `auth/logout`,
          method: 'POST',
        }
      },
    }),

    postSearchAdmin: builder.mutation({
      query(body: SearchRequest) {
        return {
          url: `admin/users/`,
          method: 'POST',
          body,
        }
      },
    }),

    postSearchAManager: builder.mutation({
      query(body: SearchRequest) {
        return {
          url: `manager/users/`,
          method: 'POST',
          body,
        }
      },
    }),

  }),
});


export const {
  usePostRegisterMutation,
  usePostRegisterAdminUsersMutation,
  usePostLoginMutation,
  usePostLogoutMutation,
  usePostSearchAdminMutation,
  usePostSearchAManagerMutation,
} = userApi;


