import { CreateOrderOptions, OrderSlice } from "@/types/order";
import { Order } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../../utils/config";

const initialState: OrderSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const createOrderFunction = createAsyncThunk(
  "order/CreateOrder",
  async (options: CreateOrderOptions, thunkApi) => {
    const { tableId, cartItems, onSuccess, onError } = options;

    try {
      const response = await fetch(`${config.apiBaseUrl}/order`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tableId, cartItems }),
      });

      const { orders } = await response.json();
      console.log("Slice");
      thunkApi.dispatch(setOrders(orders));
      onSuccess && onSuccess(orders);
    } catch {
      onError && onError();
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.items = [...state.items, ...action.payload];
    },
  },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
