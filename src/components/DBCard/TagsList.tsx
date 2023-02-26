import React from "react";
import {
  Box
} from "@mui/material";
import TagComponent from "./Tag";


export default function TagsList(props: { tags: string[] }) {
  return (
    <Box sx={{
      display: "flex", flexWrap: "wrap",
      marginTop: 2, maxWidth: 200,
      flexDirection: "end"
    }}>
      {props.tags.map(tag => <TagComponent content={tag} />)}
    </Box>

  )
}
