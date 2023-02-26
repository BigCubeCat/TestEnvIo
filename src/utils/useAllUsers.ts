import axios from "axios";
import useSWR from "swr";
import { userJsonToModel, userJSON } from "../types/UserState";
import { API_ADDRESS } from '../utils/const'

const usersFetcher = async (url: string, token: string) => {
  const { data } = await axios.get(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  }
  );
  return data;
}

export default function useAllUsers(token: string) {
  let { data, mutate, error } = useSWR([API_ADDRESS + "/accounts/", token],
    ([url, t]) => usersFetcher(url, t)
  );

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    users: (data) ? data.map((u: userJSON) => userJsonToModel(u)) : [],
    mutate
  };
}
