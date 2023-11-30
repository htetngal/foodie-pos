import {
  CreateNewMenuOptions,
  GetMenuOptions,
  MenuSlice,
  UpdateMenuOptions,
} from "@/types/menu";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../../utils/config";
import {
  deleteDisabledLocationMenus,
  setDisabledLocationMenus,
} from "./disabledLocationMenuSlice";
import {
  addMenuCategoryMenus,
  updateMenuCategoryMenus,
} from "./menuCategoryMenuSlice";

const initialState: MenuSlice = {
  items: [],
  isLoading: false,
  error: "",
};

export const getMenus = createAsyncThunk(
  "menu/getMenu",
  async (options: GetMenuOptions, thunkApi) => {
    const { locationId, onSuccess, onError } = options;
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/menu?locationId=${options.locationId}`
      );
      const menus = await response.json();
      thunkApi.dispatch(setMenus(menus));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const createNewMenu = createAsyncThunk(
  "menu/createMenu",
  async (options: CreateNewMenuOptions, thunkApi) => {
    const {
      name,
      price,
      description,
      assetUrl,
      menuCategoryIds,
      onSuccess,
      onError,
    } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menu`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          description,
          assetUrl,
          menuCategoryIds,
        }),
      });
      const { newMenu, menuCategoryMenu } = await response.json();
      thunkApi.dispatch(addMenu(newMenu));
      thunkApi.dispatch(addMenuCategoryMenus(menuCategoryMenu));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const updateMenuFunction = createAsyncThunk(
  "menu/updateMenu",
  async (options: UpdateMenuOptions, thunkApi) => {
    const {
      id,
      name,
      price,
      description,
      assetUrl,
      menuCategoryIds,
      isAvailable,
      locationId,
      onSuccess,
      onError,
    } = options;

    try {
      const response = await fetch(`${config.apiBaseUrl}/menu`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id,
          name,
          price,
          description,
          menuCategoryIds,
          assetUrl,
          isAvailable,
          locationId,
        }),
      });

      const { updatedMenu, updatedMenuCategoryMenus, disabledLocationMenus } =
        await response.json();

      thunkApi.dispatch(updateMenu(updatedMenu));

      thunkApi.dispatch(updateMenuCategoryMenus(updatedMenuCategoryMenus));

      if (isAvailable === false)
        thunkApi.dispatch(setDisabledLocationMenus(disabledLocationMenus));
      else {
        thunkApi.dispatch(
          deleteDisabledLocationMenus({ locationId, menuId: id })
        );
      }

      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenus: (state, action) => {
      state.items = action.payload;
    },

    addMenu: (state, action) => {
      state.items = [...state.items, action.payload];
    },

    updateMenu: (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setMenus, addMenu, updateMenu } = menuSlice.actions;
export default menuSlice.reducer;
