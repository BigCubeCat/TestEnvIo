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

function App() {
  // TODO redux user
  const user = useAppSelector(selectUser);
  const [databases, setDatabases] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    loadDBList(setDatabases, setTags);
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        {(user.username) ? <>
          <AppBar />
          <DBListContext.Provider value={{ databases, tags }}>
            <DashBoard />
          </DBListContext.Provider>
        </>
          : <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "center", height: "100vh" }}>
            <BgScreen />
            <LoginForm />
          </Box>
        }
      </div>
    </ThemeProvider>
  )
}

export default App
