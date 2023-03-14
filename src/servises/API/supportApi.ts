import {
  createApi
} from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";

export interface CreateSupport {
  user: string;
  text: string;
  theme: string;
}
export interface SendMessageRequst {
  id: string;
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

    getSupportRequestClient: builder.query({
      query(arg) {
        const { offset, limit, checked } = arg;
        return {
          url: `client/support-requests/`,
          params: { offset, limit, isActive: checked },
        }
      },
    }),

    getManagerSupportRequestClient: builder.query({
      query(arg) {
        const { offset, limit, checked } = arg;
        return {
          url: `manager/support-requests/`,
          params: { offset, limit, isActive: checked },
        }
      },
    }),

    getHistoryMessageSupportReques: builder.query({
      query(id) {
        return {
          url: `/common/support-requests/${id}/messages`,
        }
      },
    }),

    sendMessagePost: builder.mutation({
      query(data: SendMessageRequst) {
        return {
          url: `common/support-requests/${data.id}/messages`,
          method: 'POST',
          body: { text: data.text }
        }
      },
    }),

    sendMessageRead: builder.mutation({
      query(data: { id: string, createdBefore: Date }) {
        return {
          url: `common/support-requests/${data.id}/messages/read`,
          method: 'POST',
          body: { createdBefore: data.createdBefore }
        }
      },
    }),

    closeMessageRequest: builder.mutation({
      query(id: string) {
        return {
          url: `/common/support-requests/close/${id}`,
          method: 'POST',
        }
      },
    }),

  }),
});

export const {
  usePostSupportClientMutation,
  useGetSupportRequestClientQuery,
  useGetManagerSupportRequestClientQuery,
  useGetHistoryMessageSupportRequesQuery,
  useSendMessagePostMutation,
  useSendMessageReadMutation,
  useCloseMessageRequestMutation,
} = supportApi;


