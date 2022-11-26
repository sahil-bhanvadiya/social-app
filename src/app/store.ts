import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice';
import authSlice from './slices/authSlice';
export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
