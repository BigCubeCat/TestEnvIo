import React, { useState, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';

import AppBar from './components/Header/AppBar';
import DashBoard from './components/dashboard/DashBoard';
import { DBListContext } from './context/DBListContext';
import LoginForm from './components/forms/LoginForm';
import BgScreen from './components/placeholders/BgScreen';
import { theme } from './theme';
import { useAppSelector } from './store/hooks';
import { selectUser } from './store/userSlice';
import Me from "./components/userpage/Me";

import { Link, Route, Redirect } from "wouter";
import Forbidden from './components/placeholders/Forbidden';
import AdminPage from './components/managment/AdminPage';
import ModePage from './components/managment/ModePage';
import useDB from './utils/useDB';
import { useCookies } from 'react-cookie';


function App() {
  // TODO redux user
  const [cookie, setCookies] = useCookies(["token"]);
  const [tags, setTags] = useState([]);

  const { loading, db } = useDB(cookie.token);
  console.log("db = ", db)

  const mainComponent = <>
    <AppBar />
    <DBListContext.Provider value={{ databases: db, tags }}>
      <DashBoard loading={loading} />
    </DBListContext.Provider>
  </>

  const loginComponent = <Box sx={{
    display: "flex", justifyContent: 'center',
    alignItems: "center",
    height: "100vh"
  }}>
    <BgScreen />
    <LoginForm />
  </Box>
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Route path="/" >
          {mainComponent}
        </Route>
        <Route path="/login">
          {loginComponent}
        </Route>
        <Route path="/me">
          <Me />
        </Route>
        <Route path="/403">
          <Forbidden />
        </Route>
        <Route path="/admin">
          <AdminPage />
        </Route>
        <Route path="/mode">
          <ModePage />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </div>
    </ThemeProvider>
  )
}

export default App
