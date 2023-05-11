import React, { useState } from 'react';
import { Container, MenuItem, TextField, LinearProgress, Paper } from '@mui/material'
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { H3, AButton, ASwitch } from 'widgets/highorder'
// hooks
import { useLoadData, useLoadInit } from 'hooks/useHttp'

export default function Demo01_AppForm() {
  const [codeList] = useLoadInit('api/WeatherForecast/GetBasicData')
  const [immediately, setImmediately] = useState<boolean>(true)
  const [args, setArgs] = useState({ rowCount: 5, summary: 'all' })
  const [dataList, loading, error, refetch] = useLoadData('api/WeatherForecast/QryDataList', args, { immediately })

  return (
    <Container>
      <H3>Demo04 : 通訊測試</H3>

      <TextField select
        label="Summary"
        value={args.summary}
        onChange={e => setArgs(s => ({ ...s, summary: e.target.value }))}
        size="small"
        sx={{ width: 200 }}
      >
        <MenuItem value={'all'}>all</MenuItem>
        {Array.isArray(codeList) && codeList.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="筆數"
        type="number"
        value={args.rowCount}
        onChange={e => setArgs(s => ({ ...s, rowCount: parseInt(e.target.value) }))}
        size="small"
      />

      <AButton mutant='primary' label='Refetch' onClick={refetch} />
      <ASwitch value={immediately} label='立即刷新' onChange={v => setImmediately(v.value)} />

      {loading && <LinearProgress />}

      {(error !== null) && <pre>{`${error}`}</pre>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Temp. (C)</TableCell>
              <TableCell align="right">Temp. (F)</TableCell>
              <TableCell>Summary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(dataList) && dataList.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{item.date}</TableCell>
                <TableCell align="right">{item.temperatureC}</TableCell>
                <TableCell align="right">{item.temperatureF}</TableCell>
                <TableCell>{item.summary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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