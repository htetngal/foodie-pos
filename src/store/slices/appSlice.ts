import { AppSlice, GetAppDataOptions } from "@/types/app";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../../utils/config";
import { setAddonCategories } from "./addonCategorySlice";
import { setAddons } from "./addonSlice";
import { setDisabledLocationMenuCategories } from "./disabledLocationMenuCategorySlice";
import { setDisabledLocationMenus } from "./disabledLocationMenuSlice";
import { setLocations } from "./locationSlice";
import { setMenuAddonCategories } from "./menuAddonCategorySlice";
import { setMenuCategoryMenus } from "./menuCategoryMenuSlice";
import { setMenuCategories } from "./menuCategorySlice";
import { setMenus } from "./menuSlice";
import { setTables } from "./tableSlice";
const initialState: AppSlice = {
  init: false,
  isLoading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "app/fetchData",
  async (options: GetAppDataOptions, thunkApi) => {
    const { companyId, tableId, onSuccess, onError } = options;
    try {
      const appUrl =
        companyId && tableId
          ? `${config.apiBaseUrl}/app?companyId=${companyId}&tableId=${tableId}`
          : `${config.apiBaseUrl}/app`;
      const response = await fetch(appUrl);
      const data = await response.json();

      const {
        menuCategories,
        menus,
        menuCategoryMenus,
        addonCategories,
        menuAddonCategories,
        addons,
        locations,
        tables,
        disabledLocationMenuCategories,
        disabledLocationMenus,
      } = data;

      onSuccess && onSuccess();
      thunkApi.dispatch(setInit(true));
      thunkApi.dispatch(setMenuCategories(menuCategories));
      thunkApi.dispatch(setMenus(menus));
      thunkApi.dispatch(setMenuCategoryMenus(menuCategoryMenus));
      thunkApi.dispatch(setAddonCategories(addonCategories));
      thunkApi.dispatch(setMenuAddonCategories(menuAddonCategories));
      thunkApi.dispatch(setAddons(addons));
      thunkApi.dispatch(setLocations(locations));
      thunkApi.dispatch(setTables(tables));
      thunkApi.dispatch(
        setDisabledLocationMenuCategories(disabledLocationMenuCategories)
      );
      thunkApi.dispatch(setDisabledLocationMenus(disabledLocationMenus));
    } catch (error) {
      onError && onError();
    }
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInit: (state, action) => {
      state.init = action.payload;
    },
  },
});

export const { setInit } = appSlice.actions;
export default appSlice.reducer;
