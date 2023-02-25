import React from "react";
import {
  Box, Button, Typography, TextField
} from "@mui/material";
import { TUserState } from "../../types/UserState";
import BoolParam from "./BoolParam";
import UserInfo from "./UserInfo";
import style from "./UserCard.module.css";

export default function UserCard({ user, logout }: { user: TUserState, logout: Function }) {
  return (
    <Box className={style.UserCard}>
      <UserInfo user={user} />
      <Typography variant="h6" textAlign="center">Смена пароля</Typography>
      <Box component="form" onSubmit={() => { }}>
        <TextField
          margin="normal" required fullWidth
          id="password" label="New password"
          name="pasword"
          autoFocus
        />
        <TextField
          margin="normal" required fullWidth
          id="repeat" label="Repeat password"
          name="filename" autoComplete="filename"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Change password
        </Button>
      </Box>
      <Button
        variant="contained"
        sx={{ width: "100%", marginTop: "1em" }}
        color="secondary"
        onClick={() => logout()}
      >
        LOGOUT
      </Button>
    </Box>
  );
}

