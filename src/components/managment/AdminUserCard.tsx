import React, { useState } from "react";
import { TUserState } from "../../types/UserState";
import {
  Box, Button, Alert, TextField, FormControlLabel, Checkbox, Typography
} from "@mui/material";
import style from "../UserCard/UserCard.module.css";
import { updateUser } from "../../utils/admin";
import { useCookies } from "react-cookie";
import UserInfo from "../UserCard/UserInfo";

// TODO: вынести в отдельный виджет editMode


export default function AdminUserCard({ user }: { user: TUserState }) {
  const [cookies, setCookies] = useCookies(["token"]);
  const [editMode, setEditMode] = useState(false);
  const [newUser, setNewUser] = useState<TUserState>(Object.assign({}, user));
  const [hasMiddlename, setHasMiddlename] = useState(user.middleName != null);
  const toggleEditMode = () => setEditMode(!editMode);

  const saveUpdate = () => {
    const fetchAPI = async () => {
      const result = await updateUser(user.username, newUser, cookies.token);
      console.log(result)
    }
    fetchAPI().catch(console.error);
  }

  const [result, setResult] = useState<string>("");
  return (
    <Box className={style.UserCard}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
      <Box>
        {editMode ? <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "space-between" }}>
          <TextField id="username_field" label="username" sx={{ marginBottom: "1em" }}
            value={newUser.username}
            onChange={e => setNewUser({ ...newUser, username: e.target.value })}
          />
          <TextField id="surname" label="Фамилия" sx={{ marginBottom: "1em" }}
            value={newUser.lastName}
            onChange={e => setNewUser({ ...newUser, lastName: e.target.value })}
          />
          <TextField id="name" label="Имя" sx={{ marginBottom: "1em" }}
            value={newUser.firstName}
            onChange={e => setNewUser({ ...newUser, firstName: e.target.value })}
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
              value={newUser.middleName}
              onChange={e => setNewUser({ ...newUser, middleName: e.target.value })}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: 'space-between', }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6">Модератор</Typography>
            </Box>
            <Checkbox value={newUser.isModerator}
              onChange={() => setNewUser({ ...newUser, isModerator: !newUser.isModerator })}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: 'space-between', }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6">Активный</Typography>
            </Box>
            <Checkbox value={newUser.isActive}
              onChange={() => setNewUser({ ...newUser, isActive: !newUser.isActive })}
            />
          </Box>
        </Box> :
          <UserInfo user={user} />
        }
      </Box>
      {(result != "") && <Alert
        sx={{ marginTop: 3 }}
        severity="success"
      >{result}</Alert>
      }
      {(editMode) ? <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
        <Button variant="contained" color="error" onClick={() => toggleEditMode()}>Отмена</Button>
        <Button variant="contained" color="success" onClick={() => saveUpdate()}>Изменить</Button>
      </Box>
        : <Button fullWidth variant="contained" color="warning"
          sx={{ marginTop: 3 }}
          onClick={() => toggleEditMode()}
        >
          Edit
        </Button>
      }
    </Box >
  )
}
