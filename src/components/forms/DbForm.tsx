import React, { useState } from "react";
import {
  Box, Typography, TextField, Checkbox
} from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/userSlice";


export default function DbForm() {
  const user = useAppSelector(selectUser);

  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data)

  }

  return (
    <Box sx={{
      display: "flex",
      justifyContent: 'space-between',
      flexDirection: "column",
      alignItems: "center",
      marginTop: 3,
    }}>
      <Typography variant="h6">Create new test database</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal" required fullWidth
          id="title" label="Title"
          name="title" autoComplete="new db"
          autoFocus
        />
        <TextField
          margin="normal" required fullWidth
          id="filename" label="Filename"
          name="filename" autoComplete="filename"
        />
        <TextField
          margin="normal" required fullWidth
          id="description" label="Description"
          name="Description" autoComplete="description for new database"
          multiline maxRows={4}
        />
        <Box sx={{
          display: "flex",
          justifyContent: 'space-between',
        }}>
          <Box sx={{
            display: "flex", justifyContent: "center",
            flexDirection: "column", marginTop: 1
          }}>
            <Typography variant="h6">
              Make public
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Checkbox
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />
          </Box>
        </Box>


      </Box>
    </Box>
  )

}

