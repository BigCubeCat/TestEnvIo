import React from "react";
import {
  Box, Checkbox, Typography
} from "@mui/material";

const BoolParam = React.memo((props: { text: string, checked: boolean }) => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: 'space-between',
    }}>
      <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Typography variant="body2">
          {props.text}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Checkbox
          checked={props.checked}
          disabled
        />
      </Box>
    </Box>

  )
});

export default BoolParam;
