import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { login, logInApi, signUpApi } from "../app/slices/authSlice";
import "./SignUp.scss";
import { auth } from "../utils/interfaces/authInterface";
import axios from "axios";

const SignUp: FC = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState<Boolean>(false);
  const [userName, setUserName] = useState<String>("");
  const [userEmail, setUserEmail] = useState<String>("");
  const [userPassword, setUserPassword] = useState<String>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("login")) {
      setIsLogin(true);
    } else if (location.pathname.includes("signup")) {
      setIsLogin(false);
    }
  }, [location]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body: auth = {
      username: userName,
      email: userEmail,
      password: userPassword,
    };
    if (isLogin) {
      delete body["username"];
      dispatch(logInApi(body));
    } else {
      dispatch(signUpApi(body));
    }
    // dispatch(login())
    navigate("/");
  };

  const onSwitchHandler = () => {
    if (isLogin) {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "userName":
        if (e.target.value.length >= 4) {
          const body = {
            username: e.target.value,
          };
          axios.post(
            "https://a77b-2401-4900-5631-ccb2-db15-3ac1-6cf8-d192.in.ngrok.io/api/check_username",
            body
          );
        }

        setUserName(e.target.value);
        break;

      case "email":
        setUserEmail(e.target.value);
        break;

      case "password":
        setUserPassword(e.target.value);
        break;
    }
  };

  return (
    <div className="sign-up-container">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <Typography
          sx={{ mb: 5 }}
          textAlign="center"
          component="h1"
          variant="h5"
        >
          {isLogin ? "LogIn" : "SignUp"}
        </Typography>
        <Grid container spacing={2}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            variant="outlined"
            className="text-filed-over-write"
            autoComplete="email"
            value={userEmail}
            onChange={onChangeHandler}
            autoFocus
            sx={{
              backgroundColor: "rgba(255,255,255,0.07)",
              my: 2,
            }}
          />

          {!isLogin && (
            <TextField
              autoComplete="given-name"
              name="userName"
              required
              fullWidth
              id="userName"
              label="User Name"
              variant="outlined"
              className="text-filed-over-write"
              value={userName}
              onChange={onChangeHandler}
              sx={{
                backgroundColor: "rgba(255,255,255,0.07)",
                my: 2,
              }}
            />
          )}

          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            variant="outlined"
            className="text-filed-over-write"
            autoComplete="new-password"
            value={userPassword}
            onChange={onChangeHandler}
            sx={{
              backgroundColor: "rgba(255,255,255,0.07)",
              my: 2,
            }}
          />
          {!isLogin && (
            <FormControlLabel
              control={
                <Checkbox value="allowExtraEmails" color="primary" required />
              }
              label="I agree to the Social App Terms."
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: "black !important" }}
          >
            {isLogin ? "Log in" : "Sign Up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" onClick={onSwitchHandler}>
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SignUp;
