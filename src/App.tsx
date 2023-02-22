import React, { useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import AppBar from './components/Header/AppBar';
import DashBoard from './components/dashboard/DashBoard';
import { DBListContext } from './context/DBListContext';
import { loadAllDB } from './utils/fetchAPI';
import LoginForm from './forms/LoginForm';

let theme = createTheme({
  palette: {
    primary: {
      main: '#519839',
    },
    secondary: {
      main: '#2B7365',
    },
  },
});


function App() {
  const [user, setUser] = useState(false);
  const [databases, setDatabases] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const newData = await loadAllDB();
      setDatabases(newData);
      let set = new Set<string>();
      //ООООЧень плохо TODO: fix
      newData.map(card => card.tags.map(tag => set.add(tag)));
      setTags(Array.from(set));
    }
    fetchData().catch(console.error);
  }, [])
  console.log("tags=", tags);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        {(user) ? <>
          <AppBar />
          <DBListContext.Provider value={{ databases, tags }}>
            <DashBoard />
          </DBListContext.Provider>
        </>
          : <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "center", height: "80vh" }}>
            <LoginForm />
          </Box>
        }
      </div>
    </ThemeProvider>
  )
}

export default App
