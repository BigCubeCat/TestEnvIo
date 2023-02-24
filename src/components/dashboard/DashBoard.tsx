import React, { useContext, useEffect, useState } from "react";
import { Box, Tabs, Tab, CircularProgress } from "@mui/material";
import { pageCategory } from "../../types/page";
import TabContent from './TabContent';
import { getData } from "../../utils/dashboard";
import Search from "../Search/Search";
import AddIcon from '@mui/icons-material/Add';
import { DBListContext, TDBList } from "../../context/DBListContext";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/userSlice";
import { Redirect } from "wouter";
import DbForm from "../forms/DbForm";

export default function DashBoard(props: { loading: boolean }) {
  const userState = useAppSelector(selectUser);
  const [category, setCategory] = useState<pageCategory>("Recent");

  const dbContext: TDBList = useContext(DBListContext);

  const handleTabChange = (event: React.SyntheticEvent, newValue: pageCategory) => {
    setCategory(newValue);
  }
  if (userState.username == "") {
    return <Redirect to="/login" />
  }
  if (props.loading) {
    return <CircularProgress />
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
        <Tab value="Add" icon={<AddIcon />} />
      </Tabs>
      <Box sx={{ marginTop: "2em" }}>
        {(category == "Add") ?
          <DbForm /> :
          <TabContent
            title={category}
            cards={(category == "All") ? dbContext.databases : getData(category)}
          />
        }
      </Box>
    </Box>
  )
}
