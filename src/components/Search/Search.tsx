import React, { useContext, useState } from "react";
import {
  Box, TextField
} from "@mui/material";
import TagSelect from "./TagSelect";
import TabContent from "../dashboard/TabContent";
import { DBType } from "../../types/DBType";
import { filterCards } from '../../utils/search';
import { DBListContext, TDBList } from "../../context/DBListContext";

export default function Search() {
  const [tags, setTags] = useState([]);
  const [request, setRequest] = useState("");
  const dbContext: TDBList = useContext(DBListContext);
  console.log(dbContext)
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
          <TagSelect values={tags} setValue={setTags} tags={dbContext.tags} />
        </Box>
      </Box>
      {/*TODO: Улучшить асимптотику*/}
      <TabContent
        title="Search"
        cards={filterCards(dbContext.databases, request, tags)}
      />
    </>
  )
}
