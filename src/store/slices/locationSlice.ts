import {
  CreateLocationOptions,
  DeleteLocationOptions,
  LocationSlice,
  UpdateLocationOptions,
} from "@/types/location";
import { Location } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../../utils/config";

const initialState: LocationSlice = {
  items: [],
  selectedlocation: null,
  isLoading: false,
  error: null,
};

export const createLocationFunction = createAsyncThunk(
  "addon/createLocationFunction",
  async (options: CreateLocationOptions, thunkApi) => {
    const { name, street, township, city, companyId, onSuccess, onError } =
      options;
    console.log(options);

    try {
      const response = await fetch(`${config.apiBaseUrl}/location`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, street, township, city, companyId }),
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
    const { id, name, street, township, city, onSuccess, onError } = options;

    try {
      const response = await fetch(`${config.apiBaseUrl}/location`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, name, street, township, city }),
      });
      const { updatedLocation } = await response.json();
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
    setLocations: (state, action: PayloadAction<Location[]>) => {
      state.items = action.payload;
      const selectedLocationId = localStorage.getItem("selectedLocationId");
      if (!selectedLocationId) {
        const locationId = action.payload[0].id;
        localStorage.setItem("selectedLocationId", String(locationId));
        state.selectedlocation = action.payload[0];
      } else {
        const location = action.payload.find(
          (item) => item.id === Number(selectedLocationId)
        );
        if (location) {
          state.selectedlocation = location;
        }
      }
    },

    setSelectedLocation: (state, action: PayloadAction<Location>) => {
      state.selectedlocation = action.payload;
      localStorage.setItem("selectedLocationId", String(action.payload.id));
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

export const {
  setLocations,
  addLocation,
  updateLocation,
  deleteLocation,
  setSelectedLocation,
} = locationSlice.actions;
export default locationSlice.reducer;
