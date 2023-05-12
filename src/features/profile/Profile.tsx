import React from 'react'
import { selectIsLoggedIn, selectProfile } from 'features/auth/auth.selectors';
import s from './style.module.css'
import { Navigate } from 'react-router-dom'
import { Box, Paper } from '@mui/material';
import { FormHeaderTitle } from 'components/FormHeaderTitle/FormHeaderTitle';
import { useActions } from 'common/hooks/useActions';
import { authThunks } from 'features/auth/auth.slice';
import { useAppSelector } from 'common/hooks';

export const Profile = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const profile = useAppSelector(selectProfile)
  const {editProfile} = useActions(authThunks)

  const changeName = () => {
    editProfile({name: 'qwe', avatar: 'asd'})
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <Box className={s.wrapper}>
      <Paper variant={'outlined'} className={s.wrapperForm}>
        <FormHeaderTitle title={'Personal Information'} />
        {profile && (
          <div>
            <span>{profile.name}</span>
            <button onClick={changeName}>$$</button>
          </div>
        )}
      </Paper>
    </Box>
  )
}
