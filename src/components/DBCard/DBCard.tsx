import React from "react";
import {
  Typography, Box
} from '@mui/material';
import { DBType, Tag } from '../../types/DBType';
import style from "./DBCard.module.css";
import TagComponent from "./Tag";


export default function DBCard({ card }: { card: DBType }) {
  return (
    <Box className={style.DBCard}>
      <Typography variant="h5" component="div">
        {card.title}
      </Typography>
      <Typography variant="body2" sx={{ marginTop: "1em" }}>
        {card.description}
      </Typography>
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
