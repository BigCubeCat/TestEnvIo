import useSWR from "swr";
import { API_ADDRESS } from '../../utils/const'
import axios from 'axios';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

const tokenFetcher = async (api: string, username: string, password: string) => {
  console.log(api, username, password);
  const { data } = await axios.post(api, {
    username, password
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  )
  return data;
}

export default function useUser(username: string, password: string) {
  console.log(username, password);
  const { data, mutate, error } = useSWR(
    [API_ADDRESS + "/accounts/token/", username, password],
    ([api, username, password]) => tokenFetcher(api, username, password)
  );

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate
  };
}
