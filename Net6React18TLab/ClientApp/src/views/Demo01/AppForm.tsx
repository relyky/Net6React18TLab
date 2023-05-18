import React, { useState } from 'react'
import { Alert, AlertTitle, Container } from '@mui/material'
import { TextField } from '@mui/material'
import { H3, AButton, ASwitch } from 'widgets/highorder'
import { postData } from 'hooks/useHttp'
import { useAppSelector } from 'store/hooks'
import Swal from 'sweetalert2'
import { useInterval, useMousePosition, useWindowSize } from 'hooks/useWindowResource'
import { saveAs } from 'file-saver'
import { EchoArgs } from 'dto/Account/echoArgs';
import { EchoResult } from 'dto/Account/echoResult';

// 取得環境參數
const sysInfo = {
  BASE_URL: document.getElementsByTagName('base')[0].getAttribute('href') as string
}

export default function Demo01_AppForm() {
  const account = useAppSelector(s => s.account)
  const [letMeFail, setLetMeFail] = React.useState(true);
  const [knock, setKnock] = React.useState('有人在嗎');

  const mousePos = useMousePosition()
  const wndSize = useWindowSize()

  const [now, setNow] = useState<Date>(new Date())
  useInterval(1000, () => {
    setNow(new Date())
  })

  async function handleClick() {
    try {
      const args: EchoArgs = { knock, letMeFail }
      const data = await postData<EchoResult>('api/Account/Echo', args)
      console.log('handleClick OK', { data })
      Swal.fire({
        title: '成訊息訊',
        text: data.echo,
        icon: 'success'
      })
    }
    catch (errMsg) {
      console.log('handleClick FAIL', errMsg)
      Swal.fire({
        title: '錯誤訊息',
        text: errMsg as string,
        icon: 'error'
      })
    }
  }

  //function handleClick() {
  //  const args: EchoArgs = { knock: 'foo' }
  //  postData<EchoResult>('api/Account/Echo', args).then(data => {
  //    console.log('handleClick OK', { data })
  //    Swal.fire({
  //      title: '成訊息訊',
  //      text: data.echo,
  //      icon: 'success'
  //    })
  //  }).catch((errMsg: string) => {
  //    console.log('handleClick FAIL', { errMsg })
  //    Swal.fire({
  //      title: '錯誤訊息',
  //      text: errMsg,
  //      icon: 'error'
  //    })
  //  })
  //}

  function handleDownloadFile() {
    // How can I download a file using window.fetch?
    // https://stackoverflow.com/questions/32545632/how-can-i-download-a-file-using-window-fetch

    const url = 'api/File/DownloadFile'
    const options = {
      method: 'POST',
    };

    let fileName = 'unknown.bin'
    fetch(url, options)
      .then(resp => {
        if (!resp.ok) throw new Error('Network response was not ok.');

        // 解析附件檔名
        //const str = "attachment; filename=\"MinIO __.docx\"; filename*=UTF-8''MinIO%20%E8%A9%95%E4%BC%B0.docx";
        const contentDisposition = resp.headers.get('content-disposition') as string
        fileName = decodeURI(contentDisposition.split("filename*=UTF-8''")[1])
        return resp.blob();
      })
      .then(blob => {
        saveAs(blob, fileName)
      });
  }

  return (
    <Container>
      <H3>Demo01 : 系統與環境參數</H3>

      <TextField label="Knock" variant="standard" value={knock} onChange={element => setKnock(element.target.value)} />
      <ASwitch value={letMeFail} label="Lae Me Fail" onChange={v => setLetMeFail(v.value)} />

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
