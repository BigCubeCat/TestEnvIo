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
    request = [API_ADDRESS + "/file-infos/", token];
  } else {
    request = [API_ADDRESS + "/file-infos/all/", token]
  }
  let { data, mutate, error } = useSWR(request,
    ([url, t]) => GetFileInfos(url, t)
  );

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  let allDB: Array<DBType> = [];
  if (data) {
    allDB = data.map((db: TDatabaseForm) =>
      TDatabaseFormToDBType(db)
    )
  }
  let allTags: Set<string> = new Set();
  if (allDB.length > 0) {
    allDB.map(db => db.tags.map(tag => allTags.add(tag)))
  }

  return {
    loading,
    loggedOut,
    db: allDB,
    allTags: Array.from(allTags),
    mutate
  };
}
