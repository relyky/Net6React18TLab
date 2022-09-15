import React from 'react'
import { Paper, Grid } from '@mui/material';
import ss from './Login.module.css'
import LoginForm from './LoginForm'

export default function SignInSide() {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item className={ss.bgcover}
        xs={false}
        sm={4}
        md={7}
        lg={9}
      />
      <Grid item xs={12} sm={8} md={5} lg={3} component={Paper} elevation={6} square>
        <LoginForm />
      </Grid>
    </Grid>
  );
}