import axios from "axios";
import { API_ADDRESS } from "./const";

export async function updatePassword(password: string, token: string) {
  const { data } = await axios.put(API_ADDRESS + "/accounts/profile/", {
    new_password: password, new_password_confirm: password
  }, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
  return data.message;
}
