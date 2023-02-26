import * as React from 'react';
import {
  AppBar, Box, Toolbar, IconButton,
  Typography, Container, Tooltip, Button
} from '@mui/material';
import { Link } from "wouter";
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/userSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const TITLE: string = "TestEnv.io";

export default function Header() {
  const user = useAppSelector(selectUser);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/*TODO: img normal style*/}
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link href="/" style={{ color: "#fff" }}>
              {TITLE}
            </Link>
          </Typography>
          {(user.isAdmin) &&
            <Link href="/admin" style={{ color: "#fff", marginLeft: 10 }}>
              Admin dashboard
            </Link>
          }
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          ><Link href="/" style={{ color: "#fff" }}>
              {TITLE}
            </Link>

          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} /> {/*just spacer*/}

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: 'center', }}>
            <Link href="/me" style={{ color: "#fff" }}>
              <AccountCircleIcon fontSize="large" />
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
