import { MenuAddonCategorySlice } from "@/types/menuAddonCategory";
import { MenuAddonCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: MenuAddonCategorySlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const menuAddoncategory = createSlice({
  name: "menuAddonCategory",
  initialState,
  reducers: {
    setMenuAddonCategories: (state, action) => {
      state.items = action.payload;
    },

    addMenuAddonCategory: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },

    updateMenuAddonCategory: (
      state,
      action: PayloadAction<MenuAddonCategory[]>
    ) => {
      const others = state.items.filter(
        (item) => item.addonCategoryId !== action.payload[0].addonCategoryId
      );

      state.items = [...others, ...action.payload];
    },
  },
});

export const {
  setMenuAddonCategories,
  addMenuAddonCategory,
  updateMenuAddonCategory,
} = menuAddoncategory.actions;
export default menuAddoncategory.reducer;
