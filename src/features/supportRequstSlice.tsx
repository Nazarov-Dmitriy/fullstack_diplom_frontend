import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

interface supportState {
  supportReq: {
    id: string;
    createdAt: Date | null;
    isActive: boolean | null;
    hasNewMessages: boolean | null;
    theme: string;
    client?: {
      id: string;
      email: string;
      name: string;
      contactPhone: string;
    };
  };
}

const initialState: supportState = {
  supportReq: {
    id: "",
    createdAt: null,
    isActive: null,
    hasNewMessages: null,
    theme: "",
    client: { id: "", email: "", name: "", contactPhone: "" },
  },
};

export const supportRequstSlice = createSlice({
  name: "supportRequst",
  initialState,
  reducers: {
    addSupportRequst: (state, actions) => {
        state.supportReq = actions.payload ;
    },
  },
});

export const { addSupportRequst } = supportRequstSlice.actions;

export default supportRequstSlice.reducer;

export const supportRequst = (state: RootState) => state;
