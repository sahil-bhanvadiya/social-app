import axios from "axios";
import { logout } from "../app/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { myToken } from "../app/slices/authSlice";
const fetchClient = () => {
  const intance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  intance.interceptors.request.use(
    (config) => {
      const token = useAppSelector(myToken);
      const auth = token ? `Bearer ${token}` : "";
      if (config["headers"]) {
        config.headers["Authorization"] = auth;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  intance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.data.status === 401) {
        const dispatch = useAppDispatch();
        dispatch(logout());
      }
      return Promise.reject(error);
    }
  );

  return intance;
};

export default fetchClient;