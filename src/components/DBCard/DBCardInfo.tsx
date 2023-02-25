import React from "react";
import {
  Typography
} from "@mui/material";


interface IDBCardInfoProps {
  title: string;
  description: string;
}

const DBCardInfo = React.memo(({ title, description }: IDBCardInfoProps) => {
  return (
    <>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" sx={{ marginTop: "1em" }}>
        {description}
      </Typography>
    </>
  )
})

export default DBCardInfo;
