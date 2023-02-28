import React, { useState } from "react";
import {
  Box, Button, TextField
} from '@mui/material';
import { DBType } from '../../types/DBType';
import style from "./DBCard.module.css";
import DBCardInfo from "./DBCardInfo";
import TagsList from "./TagsList";
import DbFormControl from "../forms/DbFormControls";
import TagSelect from "../Search/TagSelect";
import { useAppSelector } from "../../store/hooks";
import { selectTags } from "../../store/tagsSlice";


export default function DBCard({ card, editable }: {
  editable: boolean, card: DBType
}) {
  const [editMode, setEditMode] = useState(false);
  const [tags, setTags] = useState<string[]>(card.tags);

  const [newTitle, setNewTitle] = useState(card.title);
  const [newDescription, setNewDescription] = useState(card.description);

  const allTags = useAppSelector(selectTags);

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
            sx={{ marginTop: "2em", marginBottom: "2em" }}
            required onChange={e => setNewDescription(e.target.value)}
            multiline maxRows={4}
          />

        </Box>
        : <DBCardInfo
          title={card.title}
          description={card.description}
          author={card.author || "unknown"}
        />
      }
      {(editMode) ?
        <TagSelect values={tags} setValue={setTags} tags={allTags} />
        : <TagsList tags={card.tags} />}
      {(editMode) && <DbFormControl id={card.id}
        newFile={{
          title: newTitle, description: newDescription,
          tags: tags, id: card.id
        }}
      />}
      {(editable) &&
        <Button fullWidth variant="contained"
          color="primary" size="small" sx={{ marginTop: 4 }}
          onClick={() => setEditMode(!editMode)}
        >{(editMode) ? "Назад" : "Редактировать"}</Button>
      }
    </Box>
  )
}
