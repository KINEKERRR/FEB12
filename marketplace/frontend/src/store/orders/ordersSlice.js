import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrderRequest, getOrdersRequest, deleteCartItemRequest } from "../../services/api";
import { clearCart } from "../cart/cartSlice";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (token, { rejectWithValue }) => {
    try {
      return await getOrdersRequest(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (token, { dispatch, rejectWithValue }) => {
    try {
      const order = await createOrderRequest(token);

      dispatch(clearCart());

      return order;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteCartItem = createAsyncThunk(
  "orders/deleteCartItem",
  async ({ token, productId }, { rejectWithValue }) => {
    try {
      await deleteCartItemRequest(token, productId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCartItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export { clearCart };

export default ordersSlice.reducer;
