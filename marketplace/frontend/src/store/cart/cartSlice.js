import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCartRequest,
  getCartRequest,
  updateCartRequest,
} from "../../services/api";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (token, { rejectWithValue }) => {
    try {
      return await getCartRequest(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ token, productId, quantity }, { rejectWithValue }) => {
    try {
      await addToCartRequest(token, {
        productId,
        quantity,
      });

      return await getCartRequest(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ token, productId, quantity }, { rejectWithValue }) => {
    try {
      await updateCartRequest(token, {
        productId,
        quantity,
      });

      return await getCartRequest(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
