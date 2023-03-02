import React from "react";
import {
  Typography, Alert
} from "@mui/material";
import { DBType } from "../../types/DBType";


const DBCardInfo = ({ card }: { card: DBType }) => {
  return (
    <>
      <Typography variant="h5" component="div">
        {card.title}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: "1em" }}>
        Автор: @{card.author}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: "1em" }}>
        {card.db_uri}
      </Typography>
      <Typography variant="body2" sx={{ marginTop: "1em" }}>
        {card.description}
      </Typography>
      {(card.status != "Ok.") &&
        <Alert variant="outlined" severity="error"
          sx={{ maxWidth: 300, marginTop: 3, marginBottom: 3 }}
        >
          {card.status}
        </Alert>
      }
    </>
  )
}

export default DBCardInfo;
