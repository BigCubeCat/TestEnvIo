import React, { useState } from "react";
import { TUserState } from "../../types/UserState";
import {
  Box, Button, Alert
} from "@mui/material";
import style from "./UserCard.module.css";
import UserInfo from "./UserInfo";
import { deactivateUser } from "../../utils/admin";
import { useCookies } from "react-cookie";

export default function AdminUserCard({ user }: { user: TUserState }) {
  const [cookies, setCookies] = useCookies(["token"]);
  const [result, setResult] = useState<string>("");
  console.log(cookies.token)
  return (
    <Box className={style.UserCard}>
      <UserInfo user={user} />
      {(result == "") ?
        <Button fullWidth variant="contained" color="secondary"
          sx={{ marginTop: 3 }}
          onClick={() => {
            const fetchAPI = async () => {
              const res = await deactivateUser(user.username, cookies.token);
              setResult(res);
            }
            fetchAPI().catch(console.error);
          }}
        >
          Deacivate
        </Button>
        : <Alert severity="success">{result}</Alert>
      }
    </Box >
  )
}
