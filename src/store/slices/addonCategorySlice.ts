import {
  AddonCategorySlice,
  CreateAddonCategoryOptions,
  UpdateAddonCategory,
} from "@/types/addonCategory";
import { AddonCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../../utils/config";
import {
  addMenuAddonCategory,
  updateMenuAddonCategory,
} from "./menuAddonCategorySlice";

const initialState: AddonCategorySlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const createNewAddonCategory = createAsyncThunk(
  "addonCategory/createAddonCategory",
  async (options: CreateAddonCategoryOptions, thunkApi) => {
    const { name, isRequired, menuIds, onSuccess, onError } = options;

    try {
      const response = await fetch(`${config.apiBaseUrl}/addon-category`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, isRequired, menuIds }),
      });
      const { newAddonCategory, newMenuAddonCategory } = await response.json();
      thunkApi.dispatch(addAddonCategory(newAddonCategory));
      thunkApi.dispatch(addMenuAddonCategory(newMenuAddonCategory));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const updateAddonCategoryFunction = createAsyncThunk(
  "addonCategory/updateAddonCategory",
  async (options: UpdateAddonCategory, thunkApi) => {
    const { id, name, isRequired, menuIds, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/addon-category`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, name, isRequired, menuIds }),
      });
      const { updatedAddonCategory, updatedMenuAddonCategory } =
        await response.json();
      thunkApi.dispatch(updateAddonCategory(updatedAddonCategory));
      thunkApi.dispatch(updateMenuAddonCategory(updatedMenuAddonCategory));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);
export const addonCategorySlice = createSlice({
  name: "addon",
  initialState,
  reducers: {
    setAddonCategories: (state, action) => {
      state.items = action.payload;
    },

    addAddonCategory: (state, action) => {
      state.items = [...state.items, action.payload];
    },

    updateAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      const others = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      state.items = [...others, action.payload];
    },
  },
});

export const { setAddonCategories, addAddonCategory, updateAddonCategory } =
  addonCategorySlice.actions;
export default addonCategorySlice.reducer;
