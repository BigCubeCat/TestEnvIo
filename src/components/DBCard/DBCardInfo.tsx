import React from "react";
import {
  Typography
} from "@mui/material";


interface IDBCardInfoProps {
  title: string;
  description: string;
  author: string;
}

const DBCardInfo = React.memo(({ title, description, author }: IDBCardInfoProps) => {
  return (
    <>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: "1em" }}>
        Автор: @{author}
      </Typography>
      <Typography variant="body2" sx={{ marginTop: "1em" }}>
        {description}
      </Typography>
    </>
  )
})

export default DBCardInfo;
