import useSWR from "swr";
import { API_ADDRESS } from '../utils/const'
import { GetFileInfos } from "./fileinfo";


export default function useDB(token: string) {
  const { data, mutate, error } = useSWR(
    [API_ADDRESS + "/file-infos/", token],
    ([_, t]) => GetFileInfos(t)
  );

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    db: data,
    mutate
  };
}
