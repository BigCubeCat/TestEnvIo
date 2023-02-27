import React from "react";
import {
  Box, TextField
} from "@mui/material";
import AppBar from '../Header/AppBar';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, selectUser, setUser } from "../../store/userSlice";
import { Redirect } from "wouter";
import UserCard from "../UserCard/UserCard";
import { useCookies } from "react-cookie";

export default function Me() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [cookie, setCookie] = useCookies(["token"]);

  const logoutFunction = () => {
    setCookie("token", "", { path: '/' });
    dispatch(logout());
  }
  if (user.username == "") {
    return <Redirect to="/login" />
  }
  return (
    <>
      <AppBar />
      <Box sx={{
        display: "flex", justifyContent: 'center',
      }}>
        <UserCard user={user} logout={() => logoutFunction()} />
      </Box>
    </>
  )
}

