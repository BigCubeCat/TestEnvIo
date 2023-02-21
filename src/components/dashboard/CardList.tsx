import React, { ComponentType } from "react";
import { Box } from "@mui/material";
import DBCard from '../DBCard/DBCard';
import { DBType } from "../../types/DBType";
import Empty from "../placeholders/Empty";


export default function CardList({ cards }: { cards: Array<DBType> }) {
  return (
    <Box sx={{
      display: "flex", flexWrap: "wrap",
      justifyContent: "start"
    }}>
      {cards.length > 0 ? cards.map(card => <DBCard card={card} />)
        : <Empty text={"Пока пусто"} />}
    </Box>
  )
}
