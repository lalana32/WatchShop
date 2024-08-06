// src/features/auth/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../api/agent';
import { FieldValues } from 'react-hook-form';
import { setCart } from './cartSlice';
import { router } from '../routes/Routes';

interface User {
  username: string;
  email: string;
  id: string;
  token: string;
  roles?: string[];
}

export interface AuthState {
  user: User | null;
}

const savedUser = localStorage.getItem('user');
const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
};

export const userLogin = createAsyncThunk<User, FieldValues>(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      const response = await agent.Account.login(data);
      const { cart, ...user } = response;
      thunkAPI.dispatch(setCart(cart));
      console.log(response);

      localStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const currentUser = createAsyncThunk<User>(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const response = await agent.Account.currentUser();
      const { cart, ...user } = response;

      thunkAPI.dispatch(setCart(cart));
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
      router.navigate('/');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(currentUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.user = null;
    });
    builder.addCase(currentUser.rejected, (state, action) => {
      state.user = null;
    });
  },
});

export const { setUser, clearUser } = authSlice.actions;
