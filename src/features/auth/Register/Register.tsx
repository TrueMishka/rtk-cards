import React, { useState } from 'react'
import s from './style.module.css'
import { authThunks } from 'features/auth/auth.slice'
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormHeaderTitle } from 'components/FormHeaderTitle/FormHeaderTitle';
import { useActions } from 'common/hooks';

type FormValues = {
  email: string
  password: string
  confirmPassword: string
}

export const Register = () => {
  const {register: registerThunk} = useActions(authThunks)

  // const registerHandler = () => {
  //   const payload = {
  //     email: 'Pashuto123@gmail.com',
  //     password: '123456789',
  //   }
  //   registerThunk(payload)
  // }

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    }
    registerThunk(payload)
  }

  return (
    <Box className={s.wrapper}>
      <Paper variant={'outlined'} className={s.wrapperForm}>
        <FormControl>
          <FormLabel focused={false}>
            <FormHeaderTitle title={'Sign up'}/>
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
              <TextField
                className={s.textField}
                {...register('confirmPassword', {
                  required: true,
                  minLength: 6,
                  validate: (value: string) => {
                    if (watch('password') !== value) {
                      return 'Your passwords do no match'
                    }
                  },
                })}
                variant={'standard'}
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword
                    ? errors.confirmPassword.type === 'minLength'
                      ? 'Password is required and must be at least 6 characters'
                      : errors.confirmPassword.type === 'validate'
                      ? errors.confirmPassword.message
                      : ''
                    : ''
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ paddingRight: '20px' }}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button type="submit" variant={'contained'}>
                Sign up
              </Button>
            </FormGroup>
          </Box>
          <Box className={s.formFooter}>
            <Typography component="p" variant="caption">
              Already have an account?
            </Typography>
            <Link to={'/login'}>Sign in</Link>
          </Box>
        </FormControl>
      </Paper>
    </Box>
  )
}
