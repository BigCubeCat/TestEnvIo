import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Tag } from '../../types/DBType';

interface ITagSelectProps {
  setValue: Function,
  values: Array<Tag>, // selected
  tags: Tag[], // all tags
}

export default function TagSelect(props: ITagSelectProps) {
  return (
    <Autocomplete
      multiple
      options={props.tags}
      limitTags={2}
      getOptionLabel={(option) => option}
      sx={{ maxWidth: 400 }}
      onChange={
        (_event: React.SyntheticEvent, value: string[], _: string) =>
          props.setValue(value)
      }
      renderInput={(params) => <TextField sx={{ width: 200 }}
        {...params} label="Tag" />
      }
    />
  );
}


