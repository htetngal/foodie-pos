import {
  CreateLocationOptions,
  DeleteLocationOptions,
  LocationSlice,
  UpdateLocationOptions,
} from "@/types/location";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../../utils/config";

const initialState: LocationSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const createLocationFunction = createAsyncThunk(
  "addon/createLocationFunction",
  async (options: CreateLocationOptions, thunkApi) => {
    const { name, address, companyId, onSuccess, onError } = options;
    console.log(options);

    try {
      const response = await fetch(`${config.apiBaseUrl}/location`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, address, companyId }),
      });
      const { newLocation } = await response.json();
      thunkApi.dispatch(addLocation(newLocation));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const updateLocationFunction = createAsyncThunk(
  "addon/updateLocationFunction",
  async (options: UpdateLocationOptions, thunkApi) => {
    const { id, name, address, onSuccess, onError } = options;

    try {
      const response = await fetch(`${config.apiBaseUrl}/location`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, name, address }),
      });
      const { updatedLocation } = await response.json();
      console.log(updatedLocation);
      thunkApi.dispatch(updateLocation(updatedLocation));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const deleteLocationFunction = createAsyncThunk(
  "addon/updatetableFunction",
  async (options: DeleteLocationOptions, thunkApi) => {
    const { id, onSuccess, onError } = options;

    try {
      await fetch(`${config.apiBaseUrl}/location?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deleteLocation({ id }));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocations: (state, action) => {
      state.items = action.payload;
      const selectedLocationId = localStorage.getItem("selectedLocationId");
      if (!selectedLocationId) {
        const locationId = action.payload[0].id;
        localStorage.setItem("selectedLocationId", String(locationId));
      }
    },

    addLocation: (state, action) => {
      state.items = [...state.items, action.payload];
    },

    updateLocation: (state, action) => {
      const others = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      state.items = [...others, action.payload];
    },

    deleteLocation: (state, action) => {
      const others = state.items.filter(
        (item) => item.id !== action.payload.id && item.isArchived === false
      );
      state.items = [...others];
    },
  },
});

export const { setLocations, addLocation, updateLocation, deleteLocation } =
  locationSlice.actions;
export default locationSlice.reducer;
