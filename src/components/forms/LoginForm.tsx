import React, { useState } from 'react';
import {
  Avatar, Button, TextField, Box, Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useCookies } from 'react-cookie';
import useSWR from "swr";

import { API_ADDRESS } from '../../utils/const';
import { fetcher } from '../../utils/main';
import useUser from './useUser';

export default function SignIn() {
  const [cookies, setCookie] = useCookies(['token']);
  const [userForm, setUserForm] = useState<{ username: string, password: string }>({ username: "", password: "" });
  const { loading, loggedOut, user, mutate } = useUser(
    userForm.username, userForm.password
  );
  console.log(loading, loggedOut, user, mutate)


  const authUser = (token: string) => {
    setCookie("token", token, { path: '/' });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setUserForm({
      username: "" + data.get("username") || "",
      password: "" + data.get("password") || ""
    });
  };

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

