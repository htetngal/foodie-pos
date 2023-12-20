import {
  AddonSlice,
  CreateAddonOptions,
  DeleteAddonOptions,
  UpdateAddonOptions,
} from "@/types/addon";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../../utils/config";

const initialState: AddonSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const createAddonFunction = createAsyncThunk(
  "addon/createAddonFunction",
  async (options: CreateAddonOptions, thunkApi) => {
    const { name, price, isArchived, addonCategoryId, onSuccess, onError } =
      options;

    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/addon`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, price, isArchived, addonCategoryId }),
      });
      const newAddon = await response.json();
      thunkApi.dispatch(addAddon(newAddon));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const updateAddonFunction = createAsyncThunk(
  "addon/updateAddonFunction",
  async (options: UpdateAddonOptions, thunkApi) => {
    const { id, name, price, addonCategoryId, onSuccess, onError } = options;

    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/addon`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, name, price, addonCategoryId }),
      });
      const updatedAddon = await response.json();
      thunkApi.dispatch(updateAddon(updatedAddon));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const deleteAddonFunction = createAsyncThunk(
  "addon/deleteAddonFunction",
  async (options: DeleteAddonOptions, thunkApi) => {
    const { id, onSuccess, onError } = options;

    try {
      await fetch(`${config.backofficeApiBaseUrl}/addon?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deleteAddon({ id }));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const addonSlice = createSlice({
  name: "addon",
  initialState,
  reducers: {
    setAddons: (state, action) => {
      state.items = action.payload;
    },

    addAddon: (state, action) => {
      state.items = [...state.items, action.payload];
    },

    updateAddon: (state, action) => {
      const others = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      state.items = [...others, action.payload];
    },

    deleteAddon: (state, action) => {
      const others = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      state.items = [...others];
    },
  },
});

export const { setAddons, addAddon, updateAddon, deleteAddon } =
  addonSlice.actions;
export default addonSlice.reducer;
