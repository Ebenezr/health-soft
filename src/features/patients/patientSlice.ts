//It was Hard to write So it should be hard to Read!!
import {
  createSlice,
  PayloadAction,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import Axios from "../../app/api";
import { patientInterface, patientVitals } from "../../interfaces/interfaces";
import { RootState } from "../../app/store";

//gets user notifications
export const patchVitals = createAsyncThunk(
  "patients/patchVitals",
  async (formData: any, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { data } = await Axios.patch(
        `/patient_vitals/${formData?.id}`,
        formData
      );
      return data;
    } catch (error) {}
  }
);

//gets user notifications
export const postVitals = createAsyncThunk(
  "patients/postVitals",
  async (formData: any, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    try {
      const { data } = await Axios.post(`/patient_vitals`, formData);
      return data;
    } catch (error) {}
  }
);

interface initialStateProps {
  isLoading: boolean;
  error: any;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  vitals: patientVitals;
  info: patientInterface;
}

const initialState: initialStateProps = {
  isLoading: true,
  error: null,
  isSuccess: false,
  isError: false,
  errorMessage: "",
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
      .addCase(postVitals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        postVitals.fulfilled,
        (state, action: PayloadAction<patientVitals>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.vitals = action.payload;
        }
      )
      .addCase(postVitals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message || "";
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
        state.errorMessage = action.error.message || "";
      });
  },
});

export const { reset } = patientSlice.actions;
export default patientSlice.reducer;
