import axios from "axios";
import { TDatabaseForm } from "../types/DBType";
import { API_ADDRESS } from "./const";


export async function CreateFileInfo(token: string, newDB: TDatabaseForm) {
  const { data } = await axios.post(
    API_ADDRESS + "/file-infos/", newDB, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  }
  )
  return data;
}

export async function GetFileInfos(token: string) {
  const { data } = await axios.get(
    API_ADDRESS + "/file-infos/", {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
  return data.results;
}