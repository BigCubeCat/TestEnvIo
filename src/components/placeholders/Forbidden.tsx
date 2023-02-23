import React from "react";
import {
  Box, Typography
} from "@mui/material";
import { Link } from "wouter";

const Forbidden = () => <Box sx={{
  display: "flex",
  justifyContent: 'center',
  alignItems: 'center',
  height: "100vh",
  flexDirection: 'column',
}}>
  <Typography variant="h1">
    Тебе сюда нельзя(
  </Typography>
  <Typography variant="h3" sx={{ color: "#000" }}>
    <Link to="/">На главную</Link>
  </Typography>
</Box>

export default Forbidden;
