import React, { useState } from "react";
import { Box, Tabs, Tab, CircularProgress } from "@mui/material";
import { pageCategory } from "../../types/page";
import Search from "../Search/Search";
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/userSlice";
import { Redirect } from "wouter";
import DbForm from "../forms/DbForm";
import useDB from "../../utils/useDB";
import { useCookies } from "react-cookie";

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
  const userState = useAppSelector(selectUser);
  const [category, setCategory] = useState<pageCategory>("Recent");
  const [cookie, setCookies] = useCookies(["token"]);

  const { loading, db, allTags } = useDB(cookie.token, category);

  if (userState.username == "") {
    return <Redirect to="/login" />
  }

  let page;
  switch (category) {
    case "Add":
      page = <DbForm allTags={allTags} />
      break
    default:
      page = (loading)
        ? <Box sx={{ marginTop: 10 }}><CircularProgress /></Box>
        : <Search databases={db} allTags={allTags} />
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
