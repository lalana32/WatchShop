import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';
import { cartSlice } from './slices/cartSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
