import React from "react";
import { Redirect } from "wouter";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/userSlice";


export default function AdminPage() {
  // Не оч безопасно, но можно сказать что бэк если че проверяет
  const user = useAppSelector(selectUser);
  if (!user.isAdmin) {
    return <Redirect to="/403" />
  }
  return <div> todo admin</div>

}
