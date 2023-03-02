import React from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import DBCardInfo from "./DBCardInfo";
import style from './DBCard.module.css';
import { useAppSelector } from "../../store/hooks";
import { selectCurrentDb } from "../../store/dbSlice";
import AppBar from "../Header/AppBar";


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

/*
 * TODO: Загрузка данных с сервера
 */

export default function Preview() {
  const card = useAppSelector(selectCurrentDb);
  return (
    <>
      <AppBar />
      <Box sx={{
        display: "flex", justifyContent: "center",
        marginTop: "5em", flexDirection: "column",
        alignItems: "center"
      }}>
        <Box>
        </Box>
        <Typography variant="h4" textAlign="center">
          {card.title}
        </Typography>
        <Typography variant="body2">
          @{card.author || "root"}
        </Typography>

        <Box sx={{
          padding: "5em", width: 1000, height: 400,
        }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Box>
      </Box>
    </>
  );
}
