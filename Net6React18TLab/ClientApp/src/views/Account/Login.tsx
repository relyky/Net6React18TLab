import React from 'react';
import { Alert, AlertTitle, Container } from '@mui/material';
import { H3 } from 'widgets/hideorder';

// 取得環境參數
const sysInfo = {
  BASE_URL: document.getElementsByTagName('base')[0].getAttribute('href') as string
}

export default function Login_AppForm() {
  return (
    <Container>
      <H3>Login : 登入</H3>

      <Alert severity="info" sx={{ mt: 2 }}>
        <AlertTitle>環境參數</AlertTitle>
        <pre>{JSON.stringify(process.env, null, '  ')}</pre>
      </Alert>

      <Alert severity="info" sx={{ mt: 2 }} >
        <AlertTitle>系統參數</AlertTitle>
        <pre>{JSON.stringify(sysInfo, null, '  ')}</pre>
      </Alert>

    </Container>
  )
}
