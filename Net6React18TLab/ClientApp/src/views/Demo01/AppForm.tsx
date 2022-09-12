import React, { useEffect, useState } from 'react';

export default function Demo01_AppForm() {
  const [dataList, setDataList] = useState<Array<WeatherForecast>>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    qryDataList()
  }, [])

  async function qryDataList() {
    try {
      setLoading(true)
      const response = await fetch('api/WeatherForecast/QryDataList', {
        method: 'POST',
        body: JSON.stringify({ rowCount: 5 }),
        headers: {
          'content-type': 'application/json'
        },
      })
      const data = await response.json()
      setDataList(data)
    }
    catch (err) {
      console.error('catch ERR');
      throw err;
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '0 16px' }}>
      <h1>Demo01 : 環境參數與各項機制測試</h1>
      <p>{`loading:${loading}`}</p>
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