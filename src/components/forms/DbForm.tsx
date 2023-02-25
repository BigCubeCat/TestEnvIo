import React, { useContext, useState } from "react";
import {
  Box, Typography, TextField, Checkbox, Button, IconButton
} from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/userSlice";
import { Tag } from "../../types/DBType";
import TagSelect from "../Search/TagSelect";
import { CreateFileInfo } from "../../utils/fileinfo";
import { useCookies } from "react-cookie";
import AddIcon from '@mui/icons-material/Add';


export default function DbForm({ allTags }: { allTags: Array<Tag> }) {
  const user = useAppSelector(selectUser);

  const [cookies, setCookie] = useCookies(['token']);

  const [isPublic, setIsPublic] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState<Tag>("");
  const [currentTags, setCurrentTags] = useState<Tag[]>(allTags);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let stringTags = tags.join(',');
    stringTags = (stringTags.length > 0) ? stringTags : "no";
    CreateFileInfo(cookies.token, {
      filename: "" + data.get("filename") || "no",
      title: "" + data.get("title") || "no",
      description: "" + data.get("description") || "no",
      is_public: isPublic,
      tag: stringTags
    });
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
          variant="contained"
          component="label"
        >
          Upload File
          <input
            type="file"
            hidden
          />
        </Button>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create
        </Button>

      </Box>
    </Box>
  )

}

