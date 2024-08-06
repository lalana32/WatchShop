import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './cartSlice';
import agent from '../api/agent';

interface ProductsState {
  products: Product[];
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  totalPages: 1,
  loading: false,
  error: null,
};

export interface Filters {
  brands: string[];
  sex: string;
  sortBy: string;
}

export const fetchProductsAsync = createAsyncThunk<
  { products: Product[]; totalPages: number },
  URLSearchParams
>('products/fetchProductsAsync', async (params, thunkAPI) => {
  try {
    const response = await agent.Products.getAll(params);
    return { products: response.products, totalPages: response.totalPages };
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const deleteProductsAsync = createAsyncThunk<void, number>(
  'products/deleteProductsAsync',
  async (data, thunkAPI) => {
    try {
      return await agent.Products.deleteProduct(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      localStorage.setItem('products', JSON.stringify(action.payload));
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem('products', JSON.stringify(state.products));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProductsAsync.fulfilled,
        (
          state,
          action: PayloadAction<{ products: Product[]; totalPages: number }>
        ) => {
          state.products = action.payload.products;
          state.totalPages = action.payload.totalPages;
          state.loading = false;
        }
      )
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteProductsAsync.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.meta.arg
        );
        state.loading = false;
      })
      .addCase(deleteProductsAsync.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setProducts, removeProduct } = productsSlice.actions;
