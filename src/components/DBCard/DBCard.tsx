import React, { useState } from "react";
import {
  Box, Button, TextField, IconButton
} from '@mui/material';
import { DBType } from '../../types/DBType';
import style from "./DBCard.module.css";
import DBCardInfo from "./DBCardInfo";
import TagsList from "./TagsList";
import DbFormControl from "../forms/DbFormControls";
import TagSelect from "../Search/TagSelect";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectTags } from "../../store/tagsSlice";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { setCurrent } from "../../store/dbSlice";
import { Redirect } from "wouter";


export default function DBCard({ card, editable }: {
  editable: boolean, card: DBType
}) {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [tags, setTags] = useState<string[]>(card.tags);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [newTitle, setNewTitle] = useState(card.title);
  const [newDescription, setNewDescription] = useState(card.description);

  const allTags = useAppSelector(selectTags);

  const openPreview = () => {
    dispatch(setCurrent(card));
    setOpenModal(true);
  }
  if (openModal) {
    return <Redirect href="/preview" />
  }

  return (
    <Box className={style.DBCard}
      sx={{
        display: "flex", justifyContent: 'space-between',
        flexDirection: "column", position: "relative",
        minWidth: 200
      }}>
      {(editable) &&
        <IconButton size="small" sx={{ position: "absolute", top: 10, right: 10 }}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? <CloseIcon /> : <EditIcon />}

        </IconButton>
      }

      {(editMode)
        ? <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", marginTop: 1 }}> <TextField fullWidth value={newTitle} label="Название" autoFocus
          required onChange={e => setNewTitle(e.target.value)}
        />
          <TextField fullWidth value={newDescription} label="Описание"
            sx={{ marginTop: "2em", marginBottom: "2em" }}
            required onChange={e => setNewDescription(e.target.value)}
            multiline maxRows={4}
          />

        </Box>
        : <DBCardInfo card={card} />
      }
      {(editMode) ?
        <TagSelect values={tags} setValue={setTags} tags={allTags} />
        : <TagsList tags={card.tags} />}
      {(editMode) && <DbFormControl id={card.id}
        newFile={{
          title: newTitle, description: newDescription, author: "",
          tags: tags, id: card.id, status: card.status, db_uri: card.db_uri
        }}
      />}
      <Button
        type="submit"
        fullWidth onClick={() => openPreview()}
        variant="contained" sx={{ mt: 3, mb: 2 }}
      >Открыть</Button>
    </Box >
  )
}
