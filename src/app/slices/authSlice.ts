import { createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { auth } from "../../utils/interfaces/authInterface";
import axios from "axios";
import Api from "../../utils/apiPaths";
export interface CounterState {
  isAutheticated: boolean;
  user: {};
  token: undefined | string;
}

const initialState: CounterState = {
  isAutheticated:
    localStorage.getItem("isUserAuthed") === "true" ? true : false,
  user: {},
  token: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.token = action.payload.jwt_token;
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
      state.isAutheticated = true;
      localStorage.setItem("isUserAuthed", "true");
    },
    logout: (state) => {
      state.isAutheticated = false;
      localStorage.clear();
    },
  },
});

export const signUpApi =
  (body: auth): AppThunk =>
  (dispatch) => {
    const url: string = `${process.env.REACT_APP_BASE_URL + Api.register}`;
    axios
      .post(url, body, {headers:{"Content-Type" : "application/json"}})
      .then((res) => {
        dispatch(login(res));
      })
      .catch((err) => console.log(err));
  };

export const logInApi =
  (body: auth): AppThunk =>
  (dispatch) => {
    const url: string = `${process.env.REACT_APP_BASE_URL + Api.login}`;
    axios
      .post(url, body, {headers:{"Content-Type" : "application/json"}})
      .then((res) => {
        dispatch(login(res));
      })
      .catch((err) => console.log(err));
  };

export const { login, logout } = authSlice.actions;

export const isAuth = (state: RootState) => state.auth.isAutheticated;
export const myToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
