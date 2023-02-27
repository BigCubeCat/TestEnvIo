import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, } from "@mui/material";
import { pageCategory } from "../../types/page";
import Search from "../Search/Search";
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/userSlice";
import { Redirect } from "wouter";
import DbForm from "../forms/DbForm";
import { useCookies } from "react-cookie";
import { setTags } from "../../store/tagsSlice";
import { GetAllTags } from "../../utils/fileinfo";

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
  const [category, setCategory] = useState<pageCategory>("Recent");
  const [cookie] = useCookies(["token"]);

  // load all tags and all db
  useEffect(() => {
    if (isFetch) return;
    const fetchTags = async () => {
      //dispatch(setTags(
      const tagsList = await GetAllTags(cookie.token);
      dispatch(setTags(tagsList));
      setIsFetch(true);
    }
    fetchTags().catch(console.error);
  }, [isFetch])

  if (userState.username == "") {
    return <Redirect to="/login" />
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
        {(category == "Add") ? <DbForm /> :
          <Search category={category}
            canEdit={category == "My" || userState.isModerator}
          />
        }
      </Box>
    </Box>
  )
}
