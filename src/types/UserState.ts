export type TUserState = {
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  isAdmin: boolean;
  isModerator: boolean;
}

interface userJSON {
  created_at: string;
  updated_at: string;
  username: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  is_active: boolean;
  is_admin: boolean;
  is_moderator: boolean;
}

export function userJsonToModel(json: userJSON) {
  let model: TUserState = {
    username: json.username,
    lastName: json.last_name,
    middleName: json.middle_name,
    firstName: json.first_name,
    isAdmin: json.is_admin,
    isModerator: json.is_moderator
  };
  return model;
}

