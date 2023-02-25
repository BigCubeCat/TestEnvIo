import AppBar from "../Header/AppBar";
import React from "react";
import { Redirect } from "wouter";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/userSlice";
import { Box, CircularProgress } from "@mui/material";
import useAllUsers from "../../utils/useAllUsers";
import { useCookies } from "react-cookie";
import UserInfo from "../UserCard/UserInfo";
import { userJsonToModel } from "../../types/UserState";
import AdminUserCard from "../UserCard/AdminUserCard";


export default function AdminPage() {
  // Не оч безопасно, но бэк если че проверяет
  const user = useAppSelector(selectUser);
  const [cookies, setCookies] = useCookies(["token"]);

  if (!user.isAdmin) {
    return <Redirect to="/403" />
  }

  const { users, loading } = useAllUsers(cookies.token);

  console.log(users)

  return (
    <>
      <AppBar />
      <Box sx={{ display: "flex", justifyContent: "start", flexWrap: "wrap" }}>
        {loading ? <CircularProgress /> :
          users.map(u => {
            const userModel = userJsonToModel(u);
            if (userModel.isActive) {
              return <AdminUserCard user={userModel} />
            }
            return <></>
          })
        }
      </Box>
    </>
  )

}
