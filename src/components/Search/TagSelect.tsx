import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function TagSelect(props: { setValue: Function, values: Array<string> }) {
  return (
    <Autocomplete
      multiple
      options={tags}
      limitTags={2}
      getOptionLabel={(option) => option}
      sx={{ maxWidth: 400 }}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.setValue(event.target.value)}
      renderInput={(params) => <TextField {...params} label="Tag" />
      }
    />
  );
}

// TODO: get tags from backend
const tags = ["public", 'default', 'test', 'csv', 'mysql', 'postgree'];

