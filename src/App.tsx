import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from './components/Header/AppBar';

let theme = createTheme({
  palette: {
    primary: {
      main: '#003790',
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
      </div>
    </ThemeProvider>
  )
}

export default App
