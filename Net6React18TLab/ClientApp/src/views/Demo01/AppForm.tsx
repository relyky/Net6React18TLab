import React, { useState } from 'react';
import { Alert, AlertTitle, Container } from '@mui/material';
import { H3, AButton } from 'widgets/hideorder';
import { postData } from 'hooks/useHttp'

// 取得環境參數
const sysInfo = {
  BASE_URL: document.getElementsByTagName('base')[0].getAttribute('href') as string
}

export default function Demo01_AppForm() {
  const [token, setToken] = useState<object | null>(null);

  function handleClick() {
    postData('api/Account/Echo', { knock: 'foo' }).then(data => {
      console.log('handleClick OK', data);
    }).catch(err => {
      console.log('handleClick FAIL', err);
    })
  }

  function handleSignin() {
    const loginInfo = {
      userId: 'foo',
      mima: 'yami',
      remember: 'N'
    };

    postData('api/Account/Signin', loginInfo).then(data => {
      console.log('Signin OK', data);
      setToken(data)
    }).catch(err => {
      console.log('Signin FAIL', err);
    })
  }

  return (
    <Container>
      <H3>Demo01 : 系統與環境參數</H3>
      <AButton mutant="primary0" label="Echo" onClick={handleClick} />
      <AButton mutant="primary0" label="登入測試" onClick={handleSignin} />

      <Alert severity="info" sx={{ mt: 2 }}>
        <AlertTitle>Token</AlertTitle>
        <pre>{JSON.stringify(token, null, '  ')}</pre>
      </Alert>

      <Alert severity="info" sx={{ mt: 2 }}>
        <AlertTitle>環境參數</AlertTitle>
        <p>{JSON.stringify(process.env, null, '  ')}</p>
      </Alert>

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
