import * as React from 'react'
import { DBType, Tag } from "../types/DBType";

export type TDBList = {
  databases: DBType[];
  tags: Tag[];
}

const defaultValue: TDBList = {
  databases: [],
  tags: [],
}

export const DBListContext = React.createContext(defaultValue);
