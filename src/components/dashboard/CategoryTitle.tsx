import { Typography } from "@mui/material";
import React from "react";

export default function DashBoard({ title }: { title: string }) {
  return (
    <Typography
      variant="h4"
      gutterBottom
      sx={{
        marginBottom: 5
      }}
    >
      {title}
    </Typography>
  )
}
