import React, { useContext, useState } from "react";
import {
  Box, TextField
} from "@mui/material";
import TagSelect from "./TagSelect";
import TabContent from "../dashboard/TabContent";
import { filterCards } from '../../utils/search';
import { DBType } from "../../types/DBType";

export default function Search({ databases, allTags }: {
  databases: Array<DBType>,
  allTags: Array<string>
}) {
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
      {/*TODO: Улучшить асимптотику*/}
      <TabContent
        title="Search"
        cards={filterCards(databases, request, tags)}
      />
    </>
  )
}
