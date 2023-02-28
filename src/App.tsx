import React, { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';

import AppBar from './components/Header/AppBar';
import DashBoard from './components/dashboard/DashBoard';
import LoginForm from './components/forms/LoginForm';
import BgScreen from './components/placeholders/BgScreen';
import { theme } from './theme';
import Me from "./components/userpage/Me";

import { Route, Redirect } from "wouter";
import Forbidden from './components/placeholders/Forbidden';
import AdminPage from './components/managment/AdminPage';
import ModePage from './components/managment/ModePage';
import Preview from './components/DBCard/Preview';

const loginComponent = <Box sx={{
  display: "flex", justifyContent: 'center',
  alignItems: "center",
  height: "100vh"
}}>
  <BgScreen />
  <LoginForm />
</Box>

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Route path="/" >
          <AppBar />
          <DashBoard />
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
        <Route path="/preview">
          <Preview />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </div>
    </ThemeProvider>
  )
}

export default App
