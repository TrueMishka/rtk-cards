import React from 'react'
import s from './style.module.css'
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { FormHeaderTitle } from 'components/FormHeaderTitle/FormHeaderTitle'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { authThunks } from 'features/auth/auth.slice'
import { useAppDispatch } from 'common/hooks';

type FormValues = {
  email: string
}

export const ForgotPassword = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const message = `<div style='background-color: lime; padding: 15px'>
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`
    const payload = {
      email: data.email,
      from: '',
      message: message,
    }
    dispatch(authThunks.forgot(payload))
    console.log(data)
  }

  return (
    <Box className={s.wrapper}>
      <Paper variant={'outlined'} className={s.wrapperForm}>
        <FormControl>
          <FormLabel focused={false}>
            <FormHeaderTitle title={'Forgot your password?'} />
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
              <Typography component="p" variant="caption">
                Enter your email address and we will send you further instructions
              </Typography>
              <Button type="submit" variant={'contained'}>
                Send Instructions
              </Button>
            </FormGroup>
          </Box>
        </FormControl>
        <Box className={s.formFooter}>
          <Typography component="p" variant="caption">
            Did you remember your password?
          </Typography>
          <Link to={'/login'}>Try logging in</Link>
        </Box>
      </Paper>
    </Box>
  )
}
