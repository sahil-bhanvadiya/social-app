import { ReactNode, FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import HomePage from "../views/HomePage";
import { isAuth } from "../app/slices/authSlice";
import SignUp from "../views/SignUp";
import { ThemeProvider } from "@mui/material/styles";
import { SignUpTheme } from "../utils/Theme";
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
            <ThemeProvider theme={SignUpTheme}>
              <SignUp />
            </ThemeProvider>
          </PreventLogInRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PreventLogInRoute>
            <ThemeProvider theme={SignUpTheme}>
              <SignUp />
            </ThemeProvider>
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
