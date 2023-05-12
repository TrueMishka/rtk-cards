import React, { FC } from 'react'
import s from './style.module.css'
import { Typography } from '@mui/material'

type PropsType = {
  title: string
}

export const FormHeaderTitle: FC<PropsType> = ({ title }) => {
  return (
    <Typography component="h1" variant="h5" className={s.title}>
      {title}
    </Typography>
  )
}