import React, { useState } from 'react';

export default function Demo01_AppForm() {
  const [count, setCount] = useState(17)

  return (
    <div style={{ padding: '0 16px' }}>
      <h1>Demo01 : 環境參數與各項機制測試</h1>

      <button onClick={_ => setCount(c => c + 1)}>加加</button>
      <p style={{ fontSize: '2em', color: 'pink' }}>
        {count}
      </p>

    </div>
  );
}
