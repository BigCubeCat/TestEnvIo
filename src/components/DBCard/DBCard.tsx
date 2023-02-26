import React, { useState } from "react";
import {
  Box, Button, TextField
} from '@mui/material';
import { DBType } from '../../types/DBType';
import style from "./DBCard.module.css";
import DBCardInfo from "./DBCardInfo";
import TagsList from "./TagsList";
import DbFormControl from "../forms/DbFormControls";


export default function DBCard({ card }: { card: DBType }) {
  const [editMode, setEditMode] = useState(false);

  const [newTitle, setNewTitle] = useState(card.title);
  const [newDescription, setNewDescription] = useState(card.description);

  return (
    <Box className={style.DBCard}
      sx={{
        display: "flex", justifyContent: 'space-between', flexDirection: "column",
      }}>
      {(editMode)
        ? <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column" }}> <TextField fullWidth value={newTitle} label="Название" autoFocus
          required onChange={e => setNewTitle(e.target.value)}
        />
          <TextField fullWidth value={newDescription} label="Описание"
            sx={{ marginTop: "2em" }}
            required onChange={e => setNewDescription(e.target.value)}
            multiline maxRows={4}
          />

        </Box>
        : <DBCardInfo title={card.title} description={card.description} />
      }
      <TagsList tags={card.tags} />
      {(editMode) && <DbFormControl id={card.id}
        newFile={{
          title: newTitle, description: newDescription,
          tags: card.tags, id: card.id
        }}
      />}
      <Button fullWidth variant="contained"
        color="primary" size="small" sx={{ marginTop: 4 }}
        onClick={() => setEditMode(!editMode)}
      >{(editMode) ? "Отмена" : "Редактировать"}</Button>
    </Box>
  )
}
