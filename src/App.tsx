import React, { useState, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';

import AppBar from './components/Header/AppBar';
import DashBoard from './components/dashboard/DashBoard';
import { DBListContext } from './context/DBListContext';
import LoginForm from './components/forms/LoginForm';
import BgScreen from './components/placeholders/BgScreen';
import { loadDBList } from './utils/main';
import { theme } from './theme';
import { useAppSelector } from './store/hooks';
import { selectUser } from './store/userSlice';
import Me from "./components/userpage/Me";

import { Link, Route, Redirect } from "wouter";


function App() {
  // TODO redux user
  const user = useAppSelector(selectUser);
  const [databases, setDatabases] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    loadDBList(setDatabases, setTags);
  }, [])

  const mainComponent = <>
    <AppBar />
    <DBListContext.Provider value={{ databases, tags }}>
      <DashBoard />
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
          {(user.username == "") && <Redirect to="/login" />}
          {loginComponent}
        </Route>
        <Route path="/me">
          <Me />
        </Route>
      </div>
    </ThemeProvider>
  )
}

export default App
