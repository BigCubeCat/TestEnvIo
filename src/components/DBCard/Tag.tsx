import React from "react";
import { Chip } from "@mui/material";
import { Tag } from '../../types/DBType';

export default function TagComponent({ content }: { content: Tag }) {
  return (
    <Chip
      sx={{ marginTop: 1, marginLeft: 1, padding: 1 }}
      label={content}
      color="info"
      variant="outlined"
      clickable
    />
  )
}

