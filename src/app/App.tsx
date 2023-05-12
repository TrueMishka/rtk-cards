import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Login } from 'features/auth/Login/Login'
import { Register } from 'features/auth/Register/Register'
import { CheckEmail } from 'features/auth/CheckEmail/CheckEmail'
import { ForgotPassword } from 'features/auth/ForgotPassword/ForgotPassword'
import { Cards } from 'features/cards/Cards'
import { Learn } from 'features/cards/Learn'
import { Packs } from 'features/packs/Packs/Packs'
import { Profile } from 'features/profile/Profile'
import { AppBar, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material'
import LogoutIcon from '@mui/icons-material/Logout'
import { authThunks } from 'features/auth/auth.slice';
import { selectIsLoggedIn } from 'features/auth/auth.selectors';
import { selectIsLoading } from 'app/app.selectors';
import { ProgressBar } from 'components/ProgressBar/ProgressBar';
import { useActions, useAppDispatch, useAppSelector } from 'common/hooks';

const App = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const {initializeApp, logout} = useActions(authThunks)

  const logoutHandler = () => logout();

  useEffect(() => {
    initializeApp()
  }, [])

  return (
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
            {isLoggedIn && (
              <IconButton color="inherit" aria-label="logout" onClick={logoutHandler}>
                <LogoutIcon/>
              </IconButton>
            )}
          </div>
        </Toolbar>
        {isLoading && <ProgressBar/>}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={'/profile'} element={<Profile />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/checkEmail'} element={<CheckEmail />} />
          <Route path={'/forgotPassword'} element={<ForgotPassword />} />
          <Route path={'/cards'} element={<Cards />} />
          <Route path={'/learn'} element={<Learn />} />
          <Route path={'/packs'} element={<Packs />} />
        </Routes>
      </Container>
    </Box>
  )
}

export default App
