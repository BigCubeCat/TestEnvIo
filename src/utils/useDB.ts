import useSWR from "swr";
import {
  DBType, TDatabaseform,
  TDatabaseFormToDBType
} from "../types/DBType";
import { API_ADDRESS } from '../utils/const'
import { GetFileInfos } from "./fileinfo";


export default function useDB(token: string) {
  const { data, mutate, error } = useSWR(
    [API_ADDRESS + "/file-infos/", token],
    ([_, t]) => GetFileInfos(t)
  );

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  const allDB: Array<DBType> = data.map((db: TDatabaseform) =>
    TDatabaseFormToDBType(db)
  )
  console.log(allDB)

  return {
    loading,
    loggedOut,
    db: allDB,
    mutate
  };
}
