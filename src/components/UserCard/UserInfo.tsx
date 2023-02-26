import React from "react";
import {
  Typography, Box
} from "@mui/material";
import BoolParam from "./BoolParam";
import { TUserState } from "../../types/UserState";

const UserInfo = React.memo(({ user }: { user: TUserState }) => {
  return (
    <>
      <Typography variant="h5" component="div">
        {user.firstName + " " + user.lastName + " " + user.middleName}
      </Typography>
      <Typography variant="body1" textAlign="center" sx={{ marginTop: "1em" }}>
        {`@${user.username}`}
      </Typography>
      <Box sx={{ marginTop: 5 }}>
        <BoolParam text="Модератор"
          checked={user.isModerator}
        />
        <BoolParam text="Администратор"
          checked={user.isAdmin}
        />
      </Box>

    </>
  );
})

export default UserInfo;
