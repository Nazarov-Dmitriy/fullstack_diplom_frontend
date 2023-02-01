import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

interface modalState  {
  showModalState: boolean;
};


const initialState:modalState = {
  showModalState: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    addShowModal: (state, actions) => {         
      state.showModalState = actions.payload;
    },
  },
});

export const { addShowModal } = modalSlice.actions;

export default modalSlice.reducer;

export const modal = (state: RootState) => state;
