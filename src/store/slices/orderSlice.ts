import {
  CreateOrderOptions,
  OrderSlice,
  UpdateOrderOptions,
} from "@/types/order";
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
      const response = await fetch(`${config.orderAppApiBaseUrl}/order`, {
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

export const updateOrderFunction = createAsyncThunk(
  "order/updateOrder",
  async (options: UpdateOrderOptions, thunkApi) => {
    const { itemId, orderStatus, onSuccess, onError } = options;

    try {
      const response = await fetch(
        `${config.orderAppApiBaseUrl}/order?itemId=${itemId}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ orderStatus }),
        }
      );

      const { orders } = await response.json();
      thunkApi.dispatch(setOrders(orders));
      onSuccess && onSuccess();
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
      state.items = action.payload;
    },
  },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
