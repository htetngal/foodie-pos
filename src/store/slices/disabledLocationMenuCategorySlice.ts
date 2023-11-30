import { DisabledLocationMenuCategorySlice } from "@/types/disabledLocationMenuCategory";
import { createSlice } from "@reduxjs/toolkit";

const initialState: DisabledLocationMenuCategorySlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const disabledLocationMenuCategorySlice = createSlice({
  name: "disabledLocationMenuCategory",
  initialState,
  reducers: {
    setDisabledLocationMenuCategories: (state, action) => {
      state.items = action.payload;
    },
    addDisabledLocationMenuCategories: (state, action) => {
      const isExist = state.items.find((item) => item.id === action.payload.id);
      state.items = isExist
        ? [...state.items]
        : [...state.items, action.payload];
    },

    deleteDisabledLocationMenuCategory: (state, action) => {
      const others = state.items.filter(
        (item) =>
          !(
            item.locationId === action.payload.locationId &&
            item.menuCategoryId === action.payload.menuCategoryId
          )
      );
      state.items = [...others];
    },
  },
});

export const {
  setDisabledLocationMenuCategories,
  addDisabledLocationMenuCategories,
  deleteDisabledLocationMenuCategory,
} = disabledLocationMenuCategorySlice.actions;
export default disabledLocationMenuCategorySlice.reducer;
