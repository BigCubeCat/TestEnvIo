import React, { useState } from "react";
import {
  Box, Button, Alert
} from "@mui/material";
import { DeleteFileInfo, EditFileInfo } from "../../utils/fileinfo";
import { useCookies } from "react-cookie";
import { DBType } from "../../types/DBType";
import { useAppDispatch } from "../../store/hooks";
import { removeDb } from "../../store/dbSlice";

export default function DbFormControl(props: {
  id: number, newFile: DBType
}) {
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(["token"]);
  const [status, setStatus] = useState<string>("");

  const deleteDb = () => {
    const fetchResult = async () => {
      setStatus((await DeleteFileInfo(props.id, cookies.token))
        ? "success" : "error"
      )
      dispatch(removeDb(props.id));
    }
    fetchResult().catch(console.error);
  }

  const editDb = () => {
    const fetchResult = async () => {
      const response = await EditFileInfo(props.id, props.newFile, cookies.token);
      setStatus(
        response ? "success" : "error"
      )
    }
    fetchResult().catch(console.error);
  }
  return (
    <Box>
      {(status.length > 0) &&
        < Alert severity="success">{status}</Alert>
      }
      <Box sx={{
        display: "flex", justifyContent: 'space-between', marginTop: 3
      }}>
        <Box sx={{ minWidth: "1em" }}></Box>
        <Button fullWidth variant="contained"
          color="error" onClick={() => deleteDb()}>Удалить</Button>
        <Box sx={{ minWidth: "1em" }}></Box>
        <Button fullWidth variant="contained" color="success"
          onClick={() => editDb()}
        >
          Сохранить
        </Button>
      </Box>
    </Box >
  )
}
