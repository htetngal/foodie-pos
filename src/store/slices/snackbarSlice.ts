import { SnackbarSeverity, SnackbarSlice } from "@/types/snackbar";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState: SnackbarSlice = {
  open: false,
  message: "",
  autohideDuration: 0,
  severity: "success",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setOpenSnackbar: (
      state,
      action: PayloadAction<{
        message: string;
        autohideDuration: number;
        severity: SnackbarSeverity;
      }>
    ) => {
      const {
        message,
        autohideDuration = 5000,
        severity = "success",
      } = action.payload;
      state.open = true;
      state.autohideDuration = autohideDuration;
      state.severity = severity;
      state.message = message;
    },

    resetSnackbar: (state) => {
      state.open = false;
      state.autohideDuration = 5000;
      state.severity = "success";
      state.message = null;
    },
  },
});

export const { setOpenSnackbar, resetSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
