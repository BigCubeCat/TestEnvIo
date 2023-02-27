import React, { useState } from "react";
import {
  Box, TextField
} from "@mui/material";
import TagSelect from "./TagSelect";
import TabContent from "../dashboard/TabContent";
import { useAppSelector } from "../../store/hooks";
import { selectTags } from "../../store/tagsSlice";

export default function Search() {
  const allTags = useAppSelector(selectTags);
  const [tags, setTags] = useState([]);
  const [request, setRequest] = useState("");
  return (
    <>
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
          <TagSelect values={tags} setValue={setTags} tags={allTags} />
        </Box>
      </Box>
      <TabContent request={request} tags={tags} />
    </>
  )
}
