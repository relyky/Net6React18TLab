import React, { useEffect } from 'react'
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Box, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
// hooks
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { signInAsync, LoginArgs, AuthStatus } from 'store/accountSlice'
import { useNavigate } from "react-router-dom"

const Copyright = () => (
  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
    {'Copyright © '}
    <Link color="inherit" href="https://mui.com/">
      Your Website
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
)

export default function LoginForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const account = useAppSelector(s => s.account)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const loginInfo: LoginArgs = {
      userId: data.get('userId') as string,
      credential: data.get('mima') as string,
      vcode: '123456'
    };

    dispatch(signInAsync(loginInfo))
  };

  useEffect(() => {
    if (account.status === AuthStatus.Authed)
      navigate('/') // 成功後轉址到主畫面
  }, [account])

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="帳號"
          name="userId"
          autoComplete="userid"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="mima"
          label="密碼"
          type="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="Y" name="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          登入
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Copyright />
      </Box>
    </Box>
  );
}