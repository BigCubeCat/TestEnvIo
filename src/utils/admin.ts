import axios from "axios";
import { API_ADDRESS } from "./const";

export async function deactivateUser(username: string, token: string) {
  const { data } = await axios.post(
    API_ADDRESS + "/accounts/" + username + "/deactivate/", {
    username
  },
    {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
  return data.message || "Error";
}
