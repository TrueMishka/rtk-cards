import React, { useEffect } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Login } from 'features/auth/Login/Login';
import { Register } from 'features/auth/Register/Register';
import { CheckEmail } from 'features/auth/Check-email';
import { ForgotPassword } from 'features/auth/Forgot-password';
import { Cards } from 'features/cards/Cards';
import { Learn } from 'features/learn/Learn';
import { Packs } from 'features/packs/Packs';
import { Profile } from 'features/profile/Profile';
import { AppBar, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { appAction } from 'app/app.slice';

const App = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.app.isLoading);

  useEffect(() => {
    setTimeout(() => {
      dispatch(appAction.setIsLoading({ isLoading: false }));
    }, 3000);
  }, []);

  return (
    <BrowserRouter>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position={'static'}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Cards
            </Typography>
            <div>
              <IconButton color="inherit" aria-label="logout" onClick={() => {}}>
                <LogoutIcon />
                <Link to={'/login'}>Log</Link>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/check-email'} element={<CheckEmail />} />
            <Route path={'/forgot-password'} element={<ForgotPassword />} />
            <Route path={'/cards'} element={<Cards />} />
            <Route path={'/learn'} element={<Learn />} />
            <Route path={'/packs'} element={<Packs />} />
            <Route path={'/profile'} element={<Profile />} />
          </Routes>
        </Container>
      </Box>
    </BrowserRouter>
  );
};

export default App;
