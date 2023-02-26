export type TUserState = {
  username: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  isAdmin: boolean;
  isModerator: boolean;
  isActive: boolean;
}

export interface userJSON {
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
    isModerator: json.is_moderator,
    isActive: json.is_active
  };
  return model;
}

