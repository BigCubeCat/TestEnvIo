import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, CircularProgress } from "@mui/material";
import { pageCategory } from "../../types/page";
import Search from "../Search/Search";
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/userSlice";
import { Redirect } from "wouter";
import DbForm from "../forms/DbForm";
import useDB from "../../utils/useDB";
import { useCookies } from "react-cookie";
import { selectTags, setTags } from "../../store/tagsSlice";
import { GetAllTags } from "../../utils/fileinfo";
import { setDbList } from "../../store/dbSlice";

const TabsComponent = ({ category, setCategory }: {
  category: pageCategory, setCategory: Function
}) => {

  const handleTabChange = (event: React.SyntheticEvent, newValue: pageCategory) => {
    setCategory(newValue);
  }
  return (
    <Tabs
      value={category}
      onChange={handleTabChange}
      variant="scrollable"
      scrollButtons="auto"
    >
      <Tab label="Recent" value="Recent" />
      <Tab label="My" value="My" />
      <Tab label="All" value="All" />
      <Tab value="Add" icon={<AddIcon />} />
    </Tabs>
  )
}

export default function DashBoard() {
  const dispatch = useAppDispatch();
  const [isFetch, setIsFetch] = useState(false);
  const userState = useAppSelector(selectUser);
  const allTags = useAppSelector(selectTags);
  const [category, setCategory] = useState<pageCategory>("Recent");
  const [cookie, setCookies] = useCookies(["token"]);

  const { loading, db } = useDB(cookie.token, category);

  // load all tags and all db
  useEffect(() => {
    if (isFetch) return;
    const fetchTags = async () => {
      //dispatch(setTags(
      const tagsList = await GetAllTags(cookie.token);
      dispatch(setTags(tagsList));
      dispatch(setDbList(db));
      setIsFetch(true);
    }
    fetchTags().catch(console.error);
  }, [isFetch, db])

  if (userState.username == "") {
    return <Redirect to="/login" />
  }

  let page;
  switch (category) {
    case "Add":
      page = <DbForm />
      break
    default:
      page = (loading)
        ? <Box sx={{ marginTop: 10 }}><CircularProgress /></Box>
        : <Search databases={db} allTags={allTags}
          canEdit={category == "My" || userState.isModerator} />
      break;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: 'column',
        padding: 10,
      }}>
      <TabsComponent category={category} setCategory={setCategory} />
      <Box sx={{ marginTop: "2em" }}>
        {page}
      </Box>
    </Box>
  )
}
