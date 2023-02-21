import React from "react";
import { Box, Typography } from "@mui/material";


export default function Empty(props: { text: string }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginBottom: 5,
        marginTop: 2
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: 'center',
          flexDirection: "column"
        }}>
        <Typography variant="h5" textAlign="center">{props.text}</Typography>
        <img
          src="/img/empty.png"
          width="64"
          height="64"
          style={{ alignSelf: "center" }}
        />
      </Box>
    </Box >
  );
}
