import React, { useState } from 'react';
import { Alert, AlertTitle, Container } from '@mui/material';
import { H3, AButton } from 'widgets/hideorder';
import { postData } from 'hooks/useHttp'
import { useAppSelector } from 'store/hooks'
import Swal from 'sweetalert2'
import { useInterval, useMousePosition, useWindowSize } from 'hooks/useWindowResource'
import { saveAs } from 'file-saver'

// 取得環境參數
const sysInfo = {
  BASE_URL: document.getElementsByTagName('base')[0].getAttribute('href') as string
}

interface EchoResult {
  echo: string
}

export default function Demo01_AppForm() {
  const account = useAppSelector(s => s.account)

  const mousePos = useMousePosition()
  const wndSize = useWindowSize()

  const [now, setNow] = useState<Date>(new Date())
  useInterval(1000, () => {
    setNow(new Date())
  })

  function handleClick() {
    postData('api/Account/Echo', { knock: 'foo' }).then(data => {
      console.log('handleClick OK', data);
      const { echo } = data as EchoResult
      Swal.fire({
        title: '成訊息訊',
        text: echo,
        icon: 'success',
      })
    }).catch(err => {
      console.log('handleClick FAIL', err);
      Swal.fire({
        title: '錯誤訊息',
        text: '不知錯誤訊息。',
        icon: 'error',
      })
    })
  }

  function handleDownloadFile() {
    // How can I download a file using window.fetch?
    // https://stackoverflow.com/questions/32545632/how-can-i-download-a-file-using-window-fetch

    const url = 'api/File/DownloadFile'
    const options = {
      method: 'POST',      
    };
    fetch(url, options)
      .then(resp => {
        if (resp.ok) return resp.blob();
        throw new Error('Network response was not ok.');
      })
      .then(blob => {
        saveAs(blob, 'MinIO 評估.docx')
      });
  }

  return (
    <Container>
      <H3>Demo01 : 系統與環境參數</H3>
      <AButton mutant="primary0" label="Echo" onClick={handleClick} />
      <AButton mutant="primary0" label="下載檔案" onClick={handleDownloadFile} />

      <Alert severity="info" sx={{ mt: 2 }}>
        <AlertTitle>{`${now}`}</AlertTitle>
        <p> size:{wndSize.w}:{wndSize.h}, mouse:{mousePos.x}:{mousePos.y}</p>
      </Alert>

      <Alert severity="warning" sx={{ mt: 2 }}>
        <AlertTitle>account</AlertTitle>
        <pre>{JSON.stringify(account, null, '  ')}</pre>
      </Alert>

      <Alert severity="info" sx={{ mt: 2 }}>
        <AlertTitle>環境參數</AlertTitle>
        <pre>{JSON.stringify(process.env, null, '  ')}</pre>
        <AlertTitle>系統參數</AlertTitle>
        <pre>{JSON.stringify(sysInfo, null, '  ')}</pre>
      </Alert>

    </Container>
  )
}
