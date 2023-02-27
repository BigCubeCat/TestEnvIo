import axios from "axios";
import { DBType, TDatabaseForm } from "../types/DBType";
import { API_ADDRESS } from "./const";

export async function CreateFileInfo(token: string, newDB: TDatabaseForm) {
  const { data } = await axios.post(
    API_ADDRESS + "/file-infos/", newDB, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })

  return data;
}

export async function GetFileInfos(url: string, token: string) {
  const { data } = await axios.get(
    url, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
  return data.results || [];
}

export async function GetAllTags(token: string) {
  const { data } = await axios.get(
    API_ADDRESS + "/file-infos/tags/", {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
  let result: Set<string> = new Set();
  if (data.results) {
    data.results.map((tag: string) => {
      tag.split(",").map((t: string) => result.add(t))
    })
  }
  return Array.from(result);
}

export async function DeleteFileInfo(id: number, token: string) {
  const { status } = await axios.delete(
    API_ADDRESS + `/file-infos/${id}/`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
  return status == 204;
}

export async function EditFileInfo(id: number, newFile: DBType, token: string) {
  const { status } = await axios.put(
    API_ADDRESS + `/file-infos/${id}/`, {
    title: newFile.title, description: newFile.description,
    tag: newFile.tags.join(',')
  }, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
  return status == 200;
}
