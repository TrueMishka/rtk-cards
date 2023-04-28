import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import s from './style.module.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { authThunks } from 'features/auth/auth.slice';

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const Login = () => {
  const dispatch = useAppDispatch()

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(authThunks.login(data))
    console.log(data);
  };

  return (
    <Box className={s.wrapper}>
      <Paper variant={'outlined'} className={s.wrapperForm}>
        <FormControl>
          <FormLabel focused={false}>
            <Typography component="h1" variant="h5" className={s.formTitle}>
              Sign in
            </Typography>
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
        </FormControl>
      </Paper>
    </Box>
  );
};
