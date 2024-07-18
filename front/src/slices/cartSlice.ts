import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../api/agent';

interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  pictureUrl: string;
  sex: string;
}

interface Cart {
  id: number;
  buyerId: string;
  cartItems: CartItem[];
}

interface CartItem {
  id: number;
  productId: number;
  product: Product;
  cartId: number;
  cart: Cart;
}

interface CartState {
  cart: Cart | null;
  status: string;
}

const savedCart = localStorage.getItem('cart');
const initialState: CartState = {
  cart: savedCart ? JSON.parse(savedCart) : null,
  status: 'idle',
};

export const fetchCartAsync = createAsyncThunk<Cart>(
  'cart/fetchCartAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Cart.getCart();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem('cart', JSON.stringify(action.payload));
    },
    clearCart: (state) => {
      state.cart = null;
      localStorage.removeItem('cart');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCartAsync.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const { setCart, clearCart } = cartSlice.actions;
