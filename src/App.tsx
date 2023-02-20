import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from './components/Header/AppBar';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

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
