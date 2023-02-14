import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

interface hotelState  {
  showModalImageState: boolean;
};


const initialState:hotelState = {
  showModalImageState: false,
};

export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    addShowModalImage: (state, actions) => {         
      state.showModalImageState = actions.payload;
    },
  },
});

export const { addShowModalImage } = hotelSlice.actions;

export default hotelSlice.reducer;

export const hotel = (state: RootState) => state;
