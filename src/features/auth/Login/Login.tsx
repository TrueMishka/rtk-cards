import React, { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import s from './style.module.css'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { authThunks } from 'features/auth/auth.slice'
import { FormHeaderTitle } from 'components/FormHeaderTitle/FormHeaderTitle'
import { selectIsLoggedIn } from 'features/auth/auth.selectors'
import { useActions, useAppDispatch, useAppSelector } from 'common/hooks';
import { toast } from 'react-toastify'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const Login = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const {login} = useActions(authThunks)

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    login(data)
      .unwrap()
      .then((res) => {
        toast.success('Вы успешно залогинились')
        navigate('/profile')
      })
      .catch((err) => {
        toast.error(err.response.error)
      })
    console.log(data)
  }

  // if (isLoggedIn) {
  //   return <Navigate to={'/'}/>
  // }

  return (
    <Box className={s.wrapper}>
      <Paper variant={'outlined'} className={s.wrapperForm}>
        <FormControl>
          <FormLabel focused={false}>
            <FormHeaderTitle title={'Sign in'} />
          </FormLabel>
          <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <FormGroup className={s.form}>
              <TextField
                className={s.textField}
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                variant={'standard'}
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors.email ? 'Email is required and must be a valid email' : ''}
              />
              <TextField
                className={s.textField}
                {...register('password', { required: true, minLength: 6 })}
                variant={'standard'}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                error={!!errors.password}
                helperText={
                  errors.password ? 'Password is required and must be at least 6 characters' : ''
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ paddingRight: '20px' }}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                label={'Remember me'}
                control={<Checkbox {...register('rememberMe')} />}
              />
              <Link to={'/forgotPassword'}>Forgot Password?</Link>
              <Button type="submit" variant={'contained'}>
                Sign in
              </Button>
            </FormGroup>
          </Box>
          <Box className={s.formFooter}>
            <Typography component="p" variant="caption">
              Don't have an account?
            </Typography>
            <Link to={'/register'}>Sign up</Link>
          </Box>
        </FormControl>
      </Paper>
    </Box>
  )
}
