import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from './components/Header/AppBar';
import {
  Routes,
  Route,
} from "react-router-dom";
import DashBoard from './components/dashboard/DashBoard';

let theme = createTheme({
  palette: {
    primary: {
      main: '#519839',
    },
    secondary: {
      main: '#fc5055',
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <AppBar />
        <DashBoard />
        <Routes>
          <Route element={<img />}>
            <Route path="/" element={<img />} />
            <Route path="/login" element={<img />} />
            <Route
              path="/protected"
              element={
                <img />
              }
            />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
