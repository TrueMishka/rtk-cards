import React from 'react';
import s from './style.module.css'
import { useAppDispatch } from 'app/hooks';
import { authThunks } from 'features/auth/auth.slice';

export const Register = () => {
  const dispatch = useAppDispatch();

  const registerHandler = () => {
    const payload = {
      email: "Pashuto123@gmail.com",
      password: "123456789"
    }
    dispatch(authThunks.register(payload));
  };

  return (
    <div className={s.container}>
      <h1>Register</h1>
      <button onClick={registerHandler}>register</button>
    </div>
  );
};