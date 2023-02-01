import {
    fetchBaseQuery,
    retry
  } from "@reduxjs/toolkit/query/react";
 
  
 export const baseQueryWithReauth = retry(
    async (args, api, extraOptions) => {
      const result = await fetchBaseQuery({
        baseUrl: process.env.REACT_APP_URL
      })(
        args,
        api,
        extraOptions
      )  
       return result
    }, {
      maxRetries: 3,
    }
  )