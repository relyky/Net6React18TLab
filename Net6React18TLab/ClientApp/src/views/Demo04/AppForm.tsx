import React, { useState } from 'react';
import { Container, TextField } from '@mui/material'
import { H3, AButton, ASwitch } from 'widgets/hideorder'
// hooks
import { usePostData, useLoad } from 'hooks/useHttp'

export default function Demo01_AppForm() {
  const [codeList] = useLoad('api/WeatherForecast/GetBasicData')
  const [immediately, setImmediately] = useState<boolean>(true)
  const [args, setArgs] = useState({ rowCount: 5 })
  const [dataList, loading, error, refetch] = usePostData('api/WeatherForecast/QryDataList', args, { immediately })

  return (
    <Container>
      <H3>Demo04 : 通訊測試</H3>

      <ASwitch value={immediately} label='立即刷新' onChange={v => setImmediately(v.value)} />

      <label htmlFor="summaryId">Summary:</label>
      <select name="summary" id="summaryId">
        <option value="">請選擇</option>
        {Array.isArray(codeList) && codeList.map((item, index) => (
          <option value={item}>{item}</option>
        ))}
      </select>

      <TextField
        label="筆數"
        type="number"
        value={args.rowCount}
        onChange={e => setArgs({ rowCount: parseInt(e.target.value) })}
        size="small"
      />

      <AButton mutant='primary' label='Refetch' onClick={refetch} />

      <p>{`immediately:${immediately}, loading:${loading}`}</p>

      {(error !== null) && <pre>{`${error}`}</pre>}
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(dataList) && dataList.map((item, index) =>
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.temperatureC}</td>
              <td>{item.temperatureF}</td>
              <td>{item.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
}

//------------------------------
//interface WeatherForecast {
//  date: string;
//  temperatureC: number;
//  temperatureF: number;
//  summary: string | null;
//}