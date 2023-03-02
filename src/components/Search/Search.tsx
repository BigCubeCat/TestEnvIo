import React, { useState, useEffect } from "react";
import {
  Box, TextField, CircularProgress
} from "@mui/material";
import TagSelect from "./TagSelect";
import TabContent from "../dashboard/TabContent";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectTags } from "../../store/tagsSlice";
import { setDbList } from "../../store/dbSlice";
import { pageCategory } from "../../types/page";
import { useCookies } from "react-cookie";
import useDB from "../../utils/useDB";

export default function Search({ canEdit, category }: {
  canEdit: boolean, category: pageCategory
}) {
  const allTags = useAppSelector(selectTags);
  const dispatch = useAppDispatch();
  const [tags, setTags] = useState([]);
  const [request, setRequest] = useState("");
  const [cookie] = useCookies(["token"]);

  const { loading, db } = useDB(cookie.token, category);

  useEffect(() => {
    const fetchAPI = async () => {
      dispatch(setDbList(db));
    }
    fetchAPI().catch(console.error);
  })
  if (loading) {
    return <Box sx={{ marginTop: 10 }}><CircularProgress /></Box>
  }
  return (
    <>
      <Box sx={{
        display: "flex",
        justifyContent: 'start',
        maxWidth: "100vw"
      }}>
        <Box sx={{ display: "flex", padding: "1em", flexWrap: "wrap" }}>
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
      <TabContent request={request} tags={tags} editable={canEdit} />
    </>
  )
}
