//It was Hard to write So it should be hard to Read!!
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Api/axios";
import { patientInterface, patientVitals } from "../../interfaces/interfaces";

//gets user notifications
export const patchVitals = createAsyncThunk(
  "patients/patchVitals",
  async ({ formData, id }: { id: number; formData: {} }, thunkAPI) => {
    try {
      const resp = await Axios.patch(`/patient_vitals/${id}`, formData);
      return resp.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//gets user notifications
export const postVitals = createAsyncThunk(
  "patients/postVitals",
  async ({ ...formData }: patientVitals, thunkAPI) => {
    try {
      const resp = await Axios.post(`/patient_vitals`, formData);
      return resp.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

interface initialStateProps {
  isLoading: boolean;
  error: any;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  vitals: {};
  info: {};
}

const initialState: initialStateProps = {
  isLoading: true,
  error: null,
  isSuccess: false,
  isError: false,
  message: "",
  vitals: {},
  info: {},
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
  extraReducers(builder) {
    builder
      .addCase(postVitals.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(postVitals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vitals = action.payload;
      })
      .addCase(postVitals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(patchVitals.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(patchVitals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vitals = action.payload;
      })
      .addCase(patchVitals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = patientSlice.actions;
export default patientSlice.reducer;
