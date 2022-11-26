import { ReactNode, FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Login from "../views/Login";
import HomePage from "../views/HomePage";
import { isAuth } from "../app/slices/authSlice";

type Props = { children: ReactNode };

const PrivateRoute: FC<Props> = ({ children }) => {
  const authed = useAppSelector(isAuth);
  return authed ? <>{children}</> : <Navigate to={"login"} />;
};

const PreventLogInRoute: FC<Props> = ({ children }) => {
  const authed = useAppSelector(isAuth);
  return !authed ? <>{children}</> : <Navigate to={"/"} />;
};

const DefinedRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PreventLogInRoute>
            <Login />
          </PreventLogInRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PreventLogInRoute>
            <Login />
          </PreventLogInRoute>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default DefinedRoutes;
