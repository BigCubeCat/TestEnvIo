import React from "react";
import {
  Typography
} from "@mui/material";

interface IUserInfoProps {
  firstname: string;
  lastname: string;
  middlename: string;
  username: string
}

const UserInfo = React.memo((props: IUserInfoProps) => {
  return (
    <>
      <Typography variant="h5" component="div">
        {props.firstname + " " + props.lastname + " " + props.middlename}
      </Typography>
      <Typography variant="body1" textAlign="center" sx={{ marginTop: "1em" }}>
        {`@${props.username}`}
      </Typography>
    </>
  );
})

export default UserInfo;
