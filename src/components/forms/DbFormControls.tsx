import React, { useState } from "react";
import {
  Box, Button, Alert
} from "@mui/material";
import { DeleteFileInfo, EditFileInfo } from "../../utils/fileinfo";
import { useCookies } from "react-cookie";

export default function DbFormControl(props: { id: number }) {
  const [cookies] = useCookies(["token"]);
  const [status, setStatue] = useState<string>("");
  return (
    <Box>
      {(status.length > 0) &&
        < Alert severity="success">{status}</Alert>
      }
      <Box sx={{ display: "flex", justifyContent: 'space-between', marginTop: 3 }}>
        <Box sx={{ minWidth: "1em" }}></Box>
        <Button fullWidth variant="contained"
          color="error" onClick={() => DeleteFileInfo(props.id, cookies.token)}
        >
          Удалить
        </Button>
        <Box sx={{ minWidth: "1em" }}></Box>
        <Button fullWidth variant="contained" color="success"
          onClick={() => EditFileInfo(props.id, cookies.token)}
        >
          Сохранить
        </Button>
      </Box>
    </Box >
  )
}
