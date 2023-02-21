import { Box } from "@mui/material";
import CategoryTitle from './CategoryTitle';
import React from "react";
import CardList from './CardList'
import { DBType } from "../../types/DBType";

export default function DashBoard() {
  const testCard: DBType = {
    title: "Super DB",
    description: "It's main database for testing",
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [{ title: "main", color: "#23f59f" }]
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: 'column',
        padding: 10,
      }}>
      <CategoryTitle title="Recent" />
      <CardList cards={[testCard, testCard, testCard]} />
      <CategoryTitle title="My databases" />
      <CategoryTitle title="Public databases" />
    </Box>
  )
}
