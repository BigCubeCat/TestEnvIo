import React from "react";
import {
  Box, Button, Typography
} from "@mui/material";
import { TUserState } from "../../types/UserState";
import style from "./UserCard.module.css";
import BoolParam from "./BoolParam";

const UserCard = React.memo((props: { user: TUserState, logout: Function }) => {
  return (
    <Box className={style.DBCard}>
      <Typography variant="h5" component="div">
        {props.user.firstName + " " + props.user.lastName + " " + props.user.middleName}
      </Typography>
      <Typography variant="body1" textAlign="center" sx={{ marginTop: "1em" }}>
        {`@${props.user.username}`}
      </Typography>
      <Box sx={{ marginTop: 5 }}>
        <BoolParam text="Модератор" checked={props.user.isModerator} />
        <BoolParam text="Администратор" checked={props.user.isAdmin} />
      </Box>
      <Button
        variant="contained"
        sx={{ width: "100%", marginTop: "5em" }}
        color="secondary"
        onClick={() => props.logout()}
      >
        LOGOUT
      </Button>
    </Box>
  );
})

export default UserCard;
