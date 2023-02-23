import React, { useContext, useEffect, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { pageCategory } from "../../types/page";
import TabContent from './TabContent';
import { getData } from "../../utils/dashboard";
import Search from "../Search/Search";
import SearchIcon from '@mui/icons-material/Search';
import { DBListContext, TDBList } from "../../context/DBListContext";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/userSlice";
import { Redirect } from "wouter";

export default function DashBoard() {
  const userState = useAppSelector(selectUser);
  const [category, setCategory] = useState<pageCategory>("Recent");

  const dbContext: TDBList = useContext(DBListContext);

  const handleTabChange = (event: React.SyntheticEvent, newValue: pageCategory) => {
    setCategory(newValue);
  }
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
      <Tabs
        value={category}
        onChange={handleTabChange}
      >
        <Tab label="Recent" value="Recent" />
        <Tab label="My" value="My" />
        <Tab label="All" value="All" />
        <Tab value="Search" icon={<SearchIcon />} />
      </Tabs>
      <Box sx={{ marginTop: "2em" }}>
        {(category == "Search") ?
          <Search /> :
          <TabContent
            title={category}
            cards={(category == "All") ? dbContext.databases : getData(category)}
          />
        }
      </Box>
    </Box>
  )
}
