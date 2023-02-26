import React, { useState } from "react";
import {
  Box, Button
} from '@mui/material';
import { DBType } from '../../types/DBType';
import style from "./DBCard.module.css";
import DBCardInfo from "./DBCardInfo";
import TagsList from "./TagsList";
import DbFormControl from "../forms/DbFormControls";


export default function DBCard({ card }: { card: DBType }) {
  const [editMode, setEditMode] = useState(false);
  return (
    <Box className={style.DBCard}
      sx={{
        display: "flex", justifyContent: 'space-between', flexDirection: "column",
      }}>
      {(editMode)
        ? <Box>
        </Box>
        : <DBCardInfo title={card.title} description={card.description} />
      }
      <TagsList tags={card.tags} />
      {(editMode) && <DbFormControl id={card.id} />}
      <Button fullWidth variant="contained"
        color="primary" size="small" sx={{ marginTop: 4 }}
        onClick={() => setEditMode(!editMode)}
      >{(editMode) ? "Отмена" : "Редактировать"}</Button>
    </Box>
  )
}
