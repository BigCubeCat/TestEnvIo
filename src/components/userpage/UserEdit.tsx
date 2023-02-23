import React from "react";
import {
  Box, Typography, Button
} from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/userSlice";

// А надо ли update current user
export default function UserEdit() {
  const user = useAppSelector(selectUser);
  return (
    <Box sx={{
      display: "flex",
      justifyContent: 'center',
      flexDirection: "column",
      alignItems: 'center',
    }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          marginTop: 10
        }}
      >
        {user.username}
      </Typography>
      <Typography variant="body2" sx={{ marginTop: "1em" }}>
        {user.isAdmin}
      </Typography>
    </Box>
  );
}
