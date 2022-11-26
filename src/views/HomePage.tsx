import { FC } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../app/slices/authSlice";
const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onLogOutHandler = (): void => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight='100vh'>
        <Button variant="contained" onClick={onLogOutHandler}>
          LogOut
        </Button>
      </Box>
    </>
  );
};

export default HomePage;
