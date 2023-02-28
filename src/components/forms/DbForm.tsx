import React, { useState } from "react";
import {
  Box, Typography, TextField, Checkbox, Button, IconButton, InputAdornment
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Tag } from "../../types/DBType";
import TagSelect from "../Search/TagSelect";
import { CreateFileInfo } from "../../utils/fileinfo";
import { useCookies } from "react-cookie";
import AddIcon from '@mui/icons-material/Add';
import { selectTags } from "../../store/tagsSlice";

/*
 * Component for create and update Database info
 */
export default function DbForm() {
  const dispatch = useAppDispatch();
  const allTags = useAppSelector(selectTags);
  const [cookies] = useCookies(['token']);

  const [isPublic, setIsPublic] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState<Tag>("");
  const [currentTags, setCurrentTags] = useState(allTags);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let stringTags = tags.join(',');
    stringTags = (stringTags.length > 0) ? stringTags : "no";
    const newDb = {
      id: 0,
      filename: "" + data.get("filename") || "no",
      title: "" + data.get("title") || "no",
      description: "" + data.get("description") || "no",
      is_public: isPublic,
      tag: stringTags
    }
    CreateFileInfo(cookies.token, newDb);
  }
  const AddTagButton = () => (
    <IconButton
      onClick={() => {
        setCurrentTags([...currentTags, newTag]);
        setTags([...tags, newTag]);
      }}
    >
      <AddIcon />
    </IconButton>
  )

  return (
    <Box sx={{
      display: "flex",
      justifyContent: 'space-between',
      flexDirection: "column",
      alignItems: "center",
      marginTop: 3,
    }}>
      <Typography variant="h4">Create new test database</Typography>
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography variant="body2">mysql:</Typography>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal" required fullWidth
          id="description" label="Description"
          name="description" autoComplete="description for new database"
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
        <Box sx={{
          display: "flex",
          justifyContent: 'space-between',
        }}>
          <Box sx={{
            display: "flex", justifyContent: "center",
            flexDirection: "column", marginTop: 1
          }}>
            <Typography variant="h6" sx={{ width: "max-content" }}>
              Tags
            </Typography>
          </Box>
          <TagSelect values={tags} setValue={setTags} tags={currentTags} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
          <TextField
            margin="normal" label="new tag"
            name="tag" value={newTag}
            onChange={event => setNewTag(event.target.value)}
            InputProps={{
              endAdornment: <AddTagButton />
            }}
          />
        </Box>
        <Button
          variant="contained" component="label" color="info"
        >
          Upload File
          <input type="file" hidden
          />
        </Button>
        <Button
          type="submit"
          fullWidth color="success"
          variant="contained" sx={{ mt: 3, mb: 2 }}
        >Create</Button>
      </Box>
    </Box>
  )
}

