import React from "react";
import {
  Box
} from '@mui/material';
import { DBType, Tag } from '../../types/DBType';
import style from "./DBCard.module.css";
import TagComponent from "./Tag";
import DBCardInfo from "./DBCardInfo";


export default function DBCard({ card }: { card: DBType }) {
  console.log(card)
  return (
    <Box className={style.DBCard}>
      <DBCardInfo title={card.title} description={card.description} />
      <Box sx={{
        display: "flex",
        flexWrap: "wrap",
        marginTop: 2,
        maxWidth: 200,
        flexDirection: "end"
      }}>
        {card.tags.map(tag => <TagComponent content={tag} />)}
      </Box>
    </Box>
  )
}
