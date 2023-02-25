import axios from "axios";
import { TUserState } from "../types/UserState";
import { API_ADDRESS } from "./const";

const generatePassword = () =>
  "P" + Math.random().toString(36).slice(-9);

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

export async function createUser(user: TUserState, token: string) {
  const { data } = await axios.post(
    API_ADDRESS + "/accounts/", {
    username: user.username, first_name: user.firstName,
    last_name: user.lastName, middle_name: user.middleName,
    password: generatePassword()
  }, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
  return data
}
