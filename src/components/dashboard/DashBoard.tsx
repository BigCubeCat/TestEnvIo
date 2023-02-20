import { Box } from "@mui/material";
import CategoryTitle from './CategoryTitle';
import React from "react";

export default function DashBoard() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: 'column',
        padding: 10,
      }}>
      <CategoryTitle title="Recent" />
      <CategoryTitle title="My databases" />
      <CategoryTitle title="Public databases" />
    </Box>
  )
}
