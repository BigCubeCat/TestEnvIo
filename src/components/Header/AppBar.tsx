import * as React from 'react';
import {
  AppBar, Box, Toolbar,
  Typography, Container, Tooltip, Button
} from '@mui/material';
import { Link } from "wouter";
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/userSlice';

const TITLE: string = "TestEnv.io";

export default function Header() {
  const user = useAppSelector(selectUser);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/*TODO: img normal style*/}
          <img style={{ width: 32, height: 32, marginRight: 28 }} src="/logo.png" />
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
            component="a"
            href=""
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
          >
            {TITLE}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} /> {/*just spacer*/}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Logout">
              {/*
              <IconButton onClick={logoutUser} sx={{ p: 0 }}>
                <Avatar alt="Moderator" src="/static/images/avatar/1.jpg" />
              </IconButton>
              */}
              <Button>
                <Link href="/me" style={{ color: "#fff" }}>profile</Link>
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
