import React from "react";
import { Redirect } from "wouter";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/userSlice";


export default function ModePage() {
  // Не оч безопасно, но можно сказать что бэк если че проверяет
  const user = useAppSelector(selectUser);
  if (!user.isModerator) {
    return <Redirect to="/403" />
  }
  return <div> todo mode</div>

}
