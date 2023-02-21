import React, { useState } from "react";
import {
  Box, Typography, TextField, Autocomplete
} from "@mui/material";
import TagSelect from "./TagSelect";

export default function Search() {
  const [tags, setTags] = useState([]);
  const [request, setRequest] = useState("");
  console.log(request, tags)
  return (
    <Box sx={{
      display: "flex",
      justifyContent: 'start',
    }}>
      <Box sx={{ display: "flex", padding: "1em" }}>
        <TextField
          sx={{ marginRight: 1, marginBottom: 1 }}
          id="search-input"
          variant="outlined"
          label="Search"
          value={request}
          onChange={
            (event: React.ChangeEvent<HTMLInputElement>) =>
              setRequest(event.target.value)
          }
        />
        <TagSelect values={tags} setValue={setTags} />
      </Box>
    </Box>
  )
}
