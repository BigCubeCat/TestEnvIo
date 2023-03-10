import React, { useState } from "react";
import {
  Box, Typography, TextField, Checkbox,
  Button, IconButton, InputAdornment, Select, SelectChangeEvent,
  MenuItem
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Tag, TDatabaseForm } from "../../types/DBType";
import TagSelect from "../Search/TagSelect";
import { CreateFileInfo } from "../../utils/fileinfo";
import { useCookies } from "react-cookie";
import AddIcon from '@mui/icons-material/Add';
import { selectTags } from "../../store/tagsSlice";

const getSqlLink = (link: string, sql: string) =>
  (sql == "") ? link : sql + link;

/*
 * Component for create and update Database info
 */
export default function DbForm() {
  const allTags = useAppSelector(selectTags);
  const [cookies] = useCookies(['token']);

  const [format, setFormat] = React.useState('json');
  const [sql, setSQL] = React.useState('mysql:/')
  const [isPublic, setIsPublic] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState<Tag>("");
  const [currentTags, setCurrentTags] = useState(allTags);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setFormat(event.target.value as string);
  };

  const handleSqlChange = (event: SelectChangeEvent) => {
    setSQL(event.target.value as string);
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let stringTags = tags.join(',');
    stringTags = (stringTags.length > 0) ? stringTags : "no";
    const newDb: TDatabaseForm = {
      id: 0, status: "",
      db_uri: getSqlLink("" + data.get("filename"), sql) || "no",
      title: "" + data.get("title") || "no",
      description: "" + data.get("description") || "no",
      export_to: format,
      is_public: isPublic,
      tag: stringTags, author: { username: "" }
    }
    CreateFileInfo(
      cookies.token,
      newDb
    );
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

  /*TODO: handle window resize*/
  return (
    <Box sx={{
      display: "flex",
      justifyContent: 'space-between',
      flexDirection: "column",
      alignItems: "center",
      marginTop: 3,
      width: "100vw"
    }}>
      <Typography variant="h4" sx={{
        maxWidth: Math.min(600, window.innerWidth * 0.8),
      }}>Create new test database</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate
        sx={{
          maxWidth: Math.min(600, window.innerWidth * 0.8),
        }}      >
        <TextField
          margin="normal" required fullWidth
          id="title" label="Title"
          name="title" autoComplete="new db"
          autoFocus
        />
        <Box sx={{ display: "flex" }}>
          <Select
            size="small" variant="standard"
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={sql}
            onChange={handleSqlChange}
            sx={{ height: "4em", alignSelf: "center" }}
          >
            <MenuItem value={"mysql:/"}>mysql:/</MenuItem>
            <MenuItem value={"sqlite:///"}>sqlite:///</MenuItem>
            <MenuItem value={"postgresql://"}>postgresql://</MenuItem>
          </Select>

          <TextField
            margin="normal" required fullWidth
            id="filename" label="db uri"
            name="filename" autoComplete="filename"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                </InputAdornment>
              ),
            }}
          />
        </Box>
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
        <Box sx={{ display: 'flex', justifyContent: "space-between", marginTop: 1 }}>
          <Typography variant="h6" marginTop={'auto'}>
            ???????????? ????????????????
          </Typography>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={format}
            label="???????????? ??????????????"
            onChange={handleSelectChange}
          >
            <MenuItem value={"json"}>json</MenuItem>
            <MenuItem value={"csv"}>csv</MenuItem>
          </Select>
        </Box>
        <Button
          type="submit"
          fullWidth color="success"
          variant="contained" sx={{ mt: 3, mb: 2 }}
        >Create</Button>
      </Box>
    </Box>
  )
}

