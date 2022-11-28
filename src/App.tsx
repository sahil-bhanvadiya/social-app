import { FC } from "react";
import "./Global.scss";
import DefinedRoutes from "./routes/Routes";
import fetchClient from './utils/axiosInterceptor'
// import axios from 'axios';
// const fetchClient = () => {
//   const defaultOptions = {
//     baseURL: process.env.REACT_APP_BASE_URL,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   let instance = axios.create(defaultOptions);

//   // Set the AUTH token for any request
//   instance.interceptors.request.use(function (config) {
//     const token = localStorage.getItem('token');
//     if(config.headers){
//       config.headers.Authorization =  token ? `Bearer ${token}` : '';
//     }
//     return config;
//   });

//   return instance;
// };

// fetchClient();
const App: FC = () => {
  fetchClient();
  return <DefinedRoutes />;
};

export default App;
