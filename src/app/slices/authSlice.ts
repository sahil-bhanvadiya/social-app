import { createSlice } from '@reduxjs/toolkit';
import { RootState} from '../store';

export interface CounterState {
    isAutheticated : boolean;
    user: Object;
}

const initialState: CounterState = {
    isAutheticated: localStorage.getItem('isUserAuthed') === 'true' ? true : false,
    user: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login : (state) => {
      state.isAutheticated = true;
      localStorage.setItem('isUserAuthed','true')
    },
    logout : (state) => {
      state.isAutheticated = false;
      localStorage.setItem('isUserAuthed','false')
    },

  },
});

export const { login, logout} = authSlice.actions;

export const isAuth = (state: RootState) => state.auth.isAutheticated;

export default authSlice.reducer;
