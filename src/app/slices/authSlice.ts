import { createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { auth } from "../../utils/interfaces/authInterface";
import axios from "axios";

export interface CounterState {
  isAutheticated: boolean;
  user: {};
  token: undefined | String;
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
    axios
      .post(
        "https://a77b-2401-4900-5631-ccb2-db15-3ac1-6cf8-d192.in.ngrok.io/api/registration",
        body
      )
      .then((res) => {
        dispatch(login(res));
      })
      .catch((err) => console.log(err));
  };

export const logInApi =
  (body: auth): AppThunk =>
  (dispatch) => {
    axios
      .post(
        "https://a77b-2401-4900-5631-ccb2-db15-3ac1-6cf8-d192.in.ngrok.io/api/login",
        body
      )
      .then((res) => {
        dispatch(login(res));
      })
      .catch((err) => console.log(err));
  };

export const { login, logout } = authSlice.actions;

export const isAuth = (state: RootState) => state.auth.isAutheticated;
export const myToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
