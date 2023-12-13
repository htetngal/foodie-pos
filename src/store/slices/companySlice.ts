import { CompanySlice, UpdateCompanyOptions } from "@/types/company";
import { Company } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../../utils/config";

const initialState: CompanySlice = {
  item: null,
  isLoading: false,
  error: null,
};

export const updateCompanyFunction = createAsyncThunk(
  "updateCompany",
  async (options: UpdateCompanyOptions, thunkApi) => {
    const { id, name, street, township, city, onSuccess, onError } = options;

    try {
      const response = await fetch(`${config.apiBaseUrl}/company`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, name, street, township, city }),
      });

      const { company } = await response.json();
      console.log(company);

      thunkApi.dispatch(setCompany(company));
      onSuccess && onSuccess();
    } catch {
      onError && onError();
    }
  }
);

const companySlice = createSlice({
  name: "companySlice",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      state.item = action.payload;
    },
  },
});

export const { setCompany } = companySlice.actions;
export default companySlice.reducer;
