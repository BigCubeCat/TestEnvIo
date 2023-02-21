import React, { useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from './components/Header/AppBar';
import {
  Routes,
  Route,
} from "react-router-dom";
import DashBoard from './components/dashboard/DashBoard';
import { DBListContext } from './context/DBListContext';
import { loadAllDB } from './utils/fetchAPI';
import { Tag } from '@mui/icons-material';

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
        <AppBar />
        <DBListContext.Provider value={{ databases, tags }}>
          <DashBoard />
        </DBListContext.Provider>
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
