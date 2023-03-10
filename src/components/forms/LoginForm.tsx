import React, { useState } from 'react';
import {
  CircularProgress, Avatar, Button, TextField, Box, Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Redirect } from 'wouter';

import { useCookies } from 'react-cookie';
import { API_ADDRESS } from '../../utils/const';

import useUser from './useUser';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { selectUser, setUser } from '../../store/userSlice';
import { userJsonToModel } from '../../types/UserState';
import { useAppSelector } from '../../store/hooks';

export default function SignIn() {
  const dispatch = useDispatch();
  const userState = useAppSelector(selectUser);
  const [cookies, setCookie] = useCookies(['token']);
  const [userForm, setUserForm] = useState<{ username: string, password: string }>({ username: "", password: "" });
  const { loading, user } = useUser(
    userForm.username, userForm.password
  );
  const loginUser = (token: string) => {
    axios.get(
      API_ADDRESS + "/accounts/profile/",
      { headers: { "Authorization": `Bearer ${token}` } }
    ).then(res => {
      if (res.status == 200) {
        dispatch(setUser(
          userJsonToModel(res.data)
        ));
      } else {
        console.log(res.status);
      }
    });
  }
  if (cookies.token) {
    loginUser(cookies.token);
  }

  const authUser = (token: string) => {
    setCookie("token", token, { path: '/' });
    loginUser(token)
  }
  if (user && user.access_token) {
    authUser(user.access_token);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setUserForm({
      username: "" + data.get("username") || "",
      password: "" + data.get("password") || ""
    });
  };

  if (userState.username != "") {
    return <Redirect to="/" />
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 500,
        zIndex: 10,
        backgroundColor: "#fff",
        padding: "1em",
        borderRadius: "1em",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        {(userForm.username != "" && loading)
          && <Box sx={{ display: "flex", justifyContent: 'center', }}>
            <CircularProgress />
          </Box>
        }
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
}

