import React from "react";
import {
  Box, Button
} from '@mui/material';
import { DBType, Tag } from '../../types/DBType';
import style from "./DBCard.module.css";
import TagComponent from "./Tag";
import DBCardInfo from "./DBCardInfo";


export default function DBCard({ card, editable }: { card: DBType, editable?: boolean }) {
  return (
    <Box className={style.DBCard}
      sx={{
        display: "flex",
        justifyContent: 'space-between',
        flexDirection: "column"
      }}
    >
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
      <Button fullWidth variant="contained"
        color="primary" size="small"
        sx={{ marginTop: 4 }}
      >
        Edit
      </Button>
    </Box>
  )
}
