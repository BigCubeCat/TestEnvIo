import * as React from 'react'
import { DBType } from "../types/DBType";

export type TDBList = {
  databases: DBType[];
}

const defaultValue: TDBList = {
  databases: [],
}

export const DBListContext = React.createContext(defaultValue);
