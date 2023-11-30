import {
  CreateMenuCategoryDataOptions,
  DeleteMenuCategoryOptions,
  MenuCategorySlice,
  UpdateMenuCategoryOptions,
} from "@/types/menuCategory";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../../utils/config";
import {
  addDisabledLocationMenuCategories,
  deleteDisabledLocationMenuCategory,
} from "./disabledLocationMenuCategorySlice";

const initialState: MenuCategorySlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const CreateMenuCategory = createAsyncThunk(
  "menuCategory/fetchMenuCategory",
  async (options: CreateMenuCategoryDataOptions, thunkApi) => {
    const { name, locationId, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menu-category`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, locationId }),
      });
      const data = await response.json();
      thunkApi.dispatch(addMenuCategories(data));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const updateMenuCategory = createAsyncThunk(
  "menuCategory/fetchMenuCategory",
  async (options: UpdateMenuCategoryOptions, thunkApi) => {
    const { id, name, isAvailable, locationId, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menu-category`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, name, isAvailable, locationId }),
      });
      const { updatedMenuCategory, disabledLocationMenuCategory } =
        await response.json();
      thunkApi.dispatch(updateMenuCategories(updatedMenuCategory));
      if (!isAvailable)
        thunkApi.dispatch(
          addDisabledLocationMenuCategories(disabledLocationMenuCategory)
        );
      else {
        thunkApi.dispatch(
          deleteDisabledLocationMenuCategory({ locationId, menuCategoryId: id })
        );
      }
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const deleteMenuCategoryFunction = createAsyncThunk(
  "addon/deleteMenuCategoryFunction",
  async (options: DeleteMenuCategoryOptions, thunkApi) => {
    const { id, onSuccess, onError } = options;

    try {
      await fetch(`${config.apiBaseUrl}/menu-category?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deleteMenuCategory({ id }));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);
export const menuCategorySlice = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    setMenuCategories: (state, action) => {
      state.items = action.payload;
    },
    addMenuCategories: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    updateMenuCategories: (state, action) => {
      const others = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      state.items = [...others, action.payload];
    },
    deleteMenuCategory: (state, action) => {
      const others = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      state.items = [...others];
    },
  },
});

export const {
  setMenuCategories,
  addMenuCategories,
  updateMenuCategories,
  deleteMenuCategory,
} = menuCategorySlice.actions;
export default menuCategorySlice.reducer;
