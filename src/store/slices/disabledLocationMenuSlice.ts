import { DisabledLocationMenuSlice } from "@/types/disabledLocationMenu";
import { createSlice } from "@reduxjs/toolkit";

const initialState: DisabledLocationMenuSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const disabledLocationMenuSlice = createSlice({
  name: "disabledLocationMenu",
  initialState,
  reducers: {
    setDisabledLocationMenus: (state, action) => {
      state.items = action.payload;
    },

    deleteDisabledLocationMenus: (state, action) => {
      const others = state.items.filter(
        (item) =>
          !(
            item.locationId === action.payload.locationId &&
            item.menuId === action.payload.menuId
          )
      );
      state.items = [...others];
    },
  },
});

export const {
  setDisabledLocationMenus,
  // addDisabledLocationMenus,
  deleteDisabledLocationMenus,
} = disabledLocationMenuSlice.actions;
export default disabledLocationMenuSlice.reducer;
