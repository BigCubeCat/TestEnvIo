import React from "react";
import {
  Box
} from "@mui/material";
import AppBar from '../Header/AppBar';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, selectUser, setUser } from "../../store/userSlice";
import { Redirect } from "wouter";
import UserCard from "../UserCard/UserCard";

export default function Me() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  if (user.username == "") {
    return <Redirect to="/login" />
  }
  return (
    <>
      <AppBar />
      <Box sx={{
        display: "flex", justifyContent: 'center',
      }}>
        <UserCard user={user} logout={() => {
          dispatch(logout());
          // TODO: modal
        }} />
      </Box>
    </>
  )
}

