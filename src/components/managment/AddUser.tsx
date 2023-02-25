import React, { useState } from "react";
import {
  Box, TextField, Button, Typography, Checkbox
} from "@mui/material"
import style from "../UserCard/UserCard.module.css"
import { createUser } from "../../utils/admin";
import { useCookies } from "react-cookie";
import { TUserState } from "../../types/UserState";

export function AddUser() {
  const [cookies, setCookies] = useCookies(["token"]);
  const [username, setUsername] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [middlename, setMiddlename] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [isModerator, setIsModerator] = useState<boolean>(false);

  const getNewUser = () => {
    const user: TUserState = {
      username,
      firstName: firstname,
      middleName: middlename,
      lastName: lastname,
      isAdmin: false, isActive: true,
      isModerator: isModerator
    }
    return user;
  }

  const createNewUser = () => {
    const fetchAPI = async () => {
      if (await createUser(getNewUser(), cookies.token)) {
        setUsername("");
        setFirstname("");
        setMiddlename("");
        setLastname("");
      }
    }
    fetchAPI().catch(console.error)
  }

  return (
    <Box className={style.UserCard} sx={{ display: 'flex', flexDirection: "column", justifyContent: "space-between" }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Create user</Typography>
      <TextField id="username_field" label="username" sx={{ marginBottom: "1em" }}
        value={username} onChange={e => setUsername(e.target.value)}
      />
      <TextField id="surname" label="Фамилия" sx={{ marginBottom: "1em" }}
        value={lastname} onChange={e => setLastname(e.target.value)}
      />
      <TextField id="name" label="Имя" sx={{ marginBottom: "1em" }}
        value={firstname} onChange={e => setFirstname(e.target.value)}
      />
      <TextField id="lastname" label="Отчество" sx={{ marginBottom: "1em" }}
        value={middlename} onChange={e => setMiddlename(e.target.value)}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">Is moderator</Typography>
        </Box>
        <Checkbox
          value={isModerator}
          onChange={() => setIsModerator(!isModerator)}
        />
      </Box>
      <Button fullWidth
        variant="contained"
        sx={{ marginTop: "1em" }}
        onClick={() => createNewUser()}
      >
        Create
      </Button>

    </Box>
  )
}
