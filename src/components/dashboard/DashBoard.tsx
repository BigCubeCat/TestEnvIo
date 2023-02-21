import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { pageCategory } from "../../types/page";
import TabContent from './TabContent';
import { getData } from "../../utils/dashboard";

export default function DashBoard() {
  const [category, setCategory] = useState<pageCategory>("Recent");
  const handleTabChange = (event: React.SyntheticEvent, newValue: pageCategory) => {
    setCategory(newValue);
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
      </Tabs>
      <Box sx={{ marginTop: "3em" }}>
        <TabContent
          title={category}
          cards={getData(category)}
        />
      </Box>
    </Box>
  )
}
