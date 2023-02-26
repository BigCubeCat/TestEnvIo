import React, { useState } from "react";
import {
  Box, Button, Typography, TextField, Alert, AlertTitle, switchClasses
} from "@mui/material";
import { TUserState } from "../../types/UserState";
import UserInfo from "./UserInfo";
import style from "./UserCard.module.css";
import { updatePassword } from "../../utils/userUpdate";
import { useCookies } from "react-cookie";

interface IInfo {
  content: string;
  type: "error" | "success" | "";
}

export default function UserCard({ user, logout }: { user: TUserState, logout: Function }) {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [info, setInfo] = useState<IInfo>({ content: "", type: "" });

  const [cookies, setCookies] = useCookies(["token"]);

  const handleSubmit = () => {
    if (password != repeatPassword) {
      setInfo({ content: "Пароли не совпадают", type: "error" });
    } else if (password.length < 8) {
      setInfo({ content: "Пароль слишком короткий", type: "error" });
    } else if (password.toLowerCase() == password) {
      setInfo({ content: "Пароль должен содержать загланые буквы", type: "error" });
    } else if (password.toUpperCase() == password) {
      setInfo({ content: "Пароль должен содержать строчные буквы", type: "error" });
    } else {
      const fetchAPI = async () => {
        const message = await updatePassword(password, cookies.token);
        setInfo({ content: message, type: "success" });
      }
      fetchAPI().catch(console.error);
    }
  }

  let message = <></>;
  switch (info.type) {
    case "error":
      message = <Alert severity="warning">{info.content}</Alert>
      break;
    case "success":
      message = <Alert severity="success">{info.content}</Alert>
      break;
    default:
      message = <></>
      break
  }

  return (
    <Box className={style.UserCard}>
      <UserInfo user={user} />
      <Typography variant="h6" textAlign="center">Смена пароля</Typography>
      <Box>
        <TextField
          margin="normal" required fullWidth
          id="password" label="New password"
          name="pasword"
          autoFocus
          value={password}
          onChange={event => setPassword(event.target.value)}
          error={repeatPassword != password}
        />
        <TextField
          margin="normal" required fullWidth
          id="repeat" label="Repeat password"
          name="filename" autoComplete="filename"
          value={repeatPassword}
          onChange={event => setRepeatPassword(event.target.value)}
          error={repeatPassword != password}
        />
        {message}
        <Button
          type="submit" fullWidth
          variant="contained"
          color="info"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Change password
        </Button>
      </Box>
      <Button
        variant="contained"
        sx={{ width: "100%", marginTop: "1em" }}
        color="error"
        onClick={() => logout()}
      >
        LOGOUT
      </Button>
    </Box >
  );
}

