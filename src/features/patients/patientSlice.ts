//It was Hard to write So it should be hard to Read!!
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Api/axios";

const initialState = {
  isLoading: true,
  error: null,
  isSuccess: false,
  isError: false,
  message: "",
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
    },
  },
});

export default patientSlice.reducer;
