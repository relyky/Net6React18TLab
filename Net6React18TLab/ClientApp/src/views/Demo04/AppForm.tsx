import React, { useEffect, useState } from 'react';
import { usePostData, useLoad } from 'hooks/useHttp'

export default function Demo01_AppForm() {
  const [args, setArgs] = useState({ rowCount: 5 })
  const [dataList, loading, error, refetch] = usePostData('api/WeatherForecast/QryDataList', args, { immediately: true })
  //const [dataList, loading, error] = useLoad('api/WeatherForecast/QryDataList', args)
  //const refetch = () => { }

  return (
    <div style={{ padding: '0 16px' }}>
      <h1>Demo04 : 通訊測試</h1>
      <input type='number' value={args.rowCount} onChange={e => setArgs({ rowCount: parseInt(e.target.value) })} />
      <button onClick={refetch}>Refetch</button>
      <p>{`loading:${loading}`}</p>
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
    </div>
  );
}

//------------------------------
interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string | null;
}