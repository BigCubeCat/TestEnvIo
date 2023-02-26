import React, { useState } from "react";
import {
  Box, TextField, Button, Typography, Checkbox, Alert,
  FormControlLabel
} from "@mui/material"
import style from "../UserCard/UserCard.module.css"
import { createUser } from "../../utils/admin";
import { useCookies } from "react-cookie";
import { TUserState } from "../../types/UserState";

export function AddUser() {
  const [cookies, setCookies] = useCookies(["token"]);
  const [hasMiddlename, setHasMiddlename] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [middlename, setMiddlename] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const getNewUser = () => {
    const user: TUserState = {
      username,
      firstName: firstname,
      middleName: (hasMiddlename) ? middlename : "",
      lastName: lastname,
      isAdmin: false, isActive: true, isModerator: false
    }
    return user;
  }

  const clearForm = () => {
    setUsername("");
    setFirstname("");
    setMiddlename("");
    setLastname("");
    setPassword("");
  }

  const createNewUser = () => {
    const fetchAPI = async () => {
      const pass = await createUser(getNewUser(), cookies.token)
      setPassword(pass);
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
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <FormControlLabel
          value="top"
          control={<Checkbox value={hasMiddlename} onChange={() => setHasMiddlename(!hasMiddlename)} />}
          label="Нет отчества"
          labelPlacement="top"
        />
        <TextField
          id="middlename" disabled={!hasMiddlename}
          label="Отчество" sx={{ marginBottom: "1em" }}
          value={middlename} onChange={e => setMiddlename(e.target.value)}
        />
      </Box>
      {(password.length > 0) && ((password.length > 1) ?
        <Alert color="success">Пароль: <strong>{password}</strong></Alert> :
        <Alert color="error"><strong>Неизвестная ошибка</strong></Alert>
      )}
      {(password.length > 0) && <Button fullWidth
        variant="contained"
        color="info"
        onClick={() => clearForm()}
      >clear</Button>

      }
      <Button fullWidth
        variant="contained"
        color={"success"}
        sx={{ marginTop: "1em" }}
        onClick={() => createNewUser()}
      >
        Create
      </Button>

    </Box>
  )
}
