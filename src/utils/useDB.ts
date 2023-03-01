import useSWR from "swr";
import {
  DBType, TDatabaseForm,
  TDatabaseFormToDBType
} from "../types/DBType";
import { pageCategory } from "../types/page";
import { API_ADDRESS } from '../utils/const'
import { GetFileInfos } from "./fileinfo";


export default function useDB(token: string, category: pageCategory) {
  let request: string[] = [];
  if (category == "My") {
    request = [API_ADDRESS + "/anonymizations/mine/", token];
  } else {
    request = [API_ADDRESS + "/anonymizations/all/", token]
  }
  let { data, mutate, error } = useSWR(request,
    ([url, t]) => GetFileInfos(url, t)
  );

  const loading = !data && !error;

  let allDB: Array<DBType> = [];
  if (data) {
    allDB = data.map((db: TDatabaseForm) =>
      TDatabaseFormToDBType(db)
    )
  }

  return {
    loading,
    db: allDB,
    mutate
  };
}
