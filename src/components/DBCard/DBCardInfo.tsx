import React from "react";
import {
  Typography
} from "@mui/material";
import { DBType } from "../../types/DBType";


interface IDBCardInfoProps {
  title: string;
  description: string;
  author: string;
  uri: string;
}

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
    </>
  )
})

export default DBCardInfo;
