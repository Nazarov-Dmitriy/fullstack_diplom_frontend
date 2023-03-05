import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

interface arrSearch {
  id: string;
  email: string;
  name: string;
  contactPhone: string;
}

interface userState {
  authenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    contactPhone: string;
    role: string;
  };
  dataSearch: arrSearch[];
}

const initialState: userState = {
  authenticated: false,
  user: { id: "", email: "", name: "", contactPhone: "", role: "" },
  dataSearch: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, actions) => {
      state.user = actions.payload;
    },
    isAuthenticated: (state, actions) => {
      state.authenticated = actions.payload;
    },
    removeUser: (state) => {
      state.user = {
        id: "",
        email: "",
        name: "",
        contactPhone: "",
        role: "",
      };
    },
    addDataSearch: (state, actions) => {
      state.dataSearch = actions.payload;
    },
    clearDataSearch: (state) => {
      state.dataSearch = [];
    },
  },
});

export const {
  addUser,
  removeUser,
  isAuthenticated,
  addDataSearch,
  clearDataSearch,
} = userSlice.actions;

export default userSlice.reducer;

export const user = (state: RootState) => state;
