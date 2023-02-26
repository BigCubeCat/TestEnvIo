import axios from "axios";
import { TUserState } from "../types/UserState";
import { API_ADDRESS } from "./const";

const generatePassword = () =>
  "P" + Math.random().toString(36).slice(-9);

export async function updateUser(
  oldUsername: string, user: TUserState, token: string
) {
  const { data } = await axios.put(
    API_ADDRESS + "/accounts/" + oldUsername, {
    username: user.username, first_name: user.firstName,
    last_name: user.lastName, middle_name: user.middleName,
    is_moderator: user.isModerator, is_active: user.isActive
  },
    {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
  return data
}

export async function createUser(user: TUserState, token: string) {
  const password = generatePassword();
  const { data } = await axios.post(
    API_ADDRESS + "/accounts/", {
    username: user.username, first_name: user.firstName,
    last_name: user.lastName, middle_name: user.middleName,
    password
  }, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
  if (data.username == user.username) {
    return password
  }
  return "0"
}
