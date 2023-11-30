import {
  CreateTableOptions,
  DeleteTableOptions,
  TableSlice,
  UpdateTableOptions,
} from "@/types/table";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../../utils/config";

const initialState: TableSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const createTableFunction = createAsyncThunk(
  "addon/createTableFunction",
  async (options: CreateTableOptions, thunkApi) => {
    const { name, locationId, onSuccess, onError } = options;
    console.log(options);

    try {
      const response = await fetch(`${config.apiBaseUrl}/table`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, locationId }),
      });
      const { newTable } = await response.json();
      thunkApi.dispatch(addTable(newTable));
      onSuccess && onSuccess();
    } catch (err) {}
  }
);

export const updateTableFunction = createAsyncThunk(
  "addon/updatetableFunction",
  async (options: UpdateTableOptions, thunkApi) => {
    const { id, name, locationId, onSuccess, onError } = options;

    try {
      const response = await fetch(`${config.apiBaseUrl}/table`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, name, locationId }),
      });
      const { updatedTable } = await response.json();
      console.log(updatedTable);

      thunkApi.dispatch(updateTable(updatedTable));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const deleteTableFunction = createAsyncThunk(
  "addon/updatetableFunction",
  async (options: DeleteTableOptions, thunkApi) => {
    const { id, onSuccess, onError } = options;

    try {
      await fetch(`${config.apiBaseUrl}/table?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deleteTable({ id }));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTables: (state, action) => {
      state.items = action.payload;
    },

    addTable: (state, action) => {
      state.items = [...state.items, action.payload];
    },

    updateTable: (state, action) => {
      const others = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      state.items = [...others, action.payload];
    },

    deleteTable: (state, action) => {
      const others = state.items.filter(
        (item) => item.id !== action.payload.id && item.isArchived === false
      );
      state.items = [...others];
    },
  },
});

export const { setTables, addTable, updateTable, deleteTable } =
  tableSlice.actions;
export default tableSlice.reducer;
