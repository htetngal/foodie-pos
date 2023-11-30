import { MenuCategoryMenuSlice } from "@/types/menuCategoryMenu";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MenuCategoryMenuSlice = {
  items: [],
  isLoading: false,
  error: null,
};

const menuCategoryMenu = createSlice({
  name: "menuCategoryMenu",
  initialState,
  reducers: {
    setMenuCategoryMenus: (state, action) => {
      state.items = action.payload;
    },
    addMenuCategoryMenus: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    updateMenuCategoryMenus: (state, action) => {
      const others = state.items.filter(
        (item) => item.menuId !== action.payload[0].menuId
      );

      state.items = [...others, ...action.payload];
    },
  },
});
/* menuCategory 1.Hot Dish 2.Noodle 3.Shan 4.Mon 
menu 1.Icecream [1,4]
menuCategoryMenu 
1,1 
1,2
1,3
2,1
4,1
5,1
menuCategoryMenu
1,1
1,4*/
export const {
  setMenuCategoryMenus,
  addMenuCategoryMenus,
  updateMenuCategoryMenus,
} = menuCategoryMenu.actions;
export default menuCategoryMenu.reducer;
