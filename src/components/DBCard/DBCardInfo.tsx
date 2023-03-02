import React from "react";
import {
  Typography, Alert
} from "@mui/material";
import { DBType } from "../../types/DBType";


const DBCardInfo = React.memo(({ card }: { card: DBType }) => {
  console.log(card)
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
      {(card.status) &&
        <Alert security="error">
          {card.status}
        </Alert>
      }
    </>
  )
})

export default DBCardInfo;
