import React, { useState } from 'react';

export default function AppForm() {
  const [count, setCount] = useState(17)

  return (
    <div style={{padding: '0 16px'}}>
      <h1>我是Demo01</h1>
      <button onClick={_ => setCount(c => c + 1)}>加加</button>
      <p style={{ fontSize: '2em', color: 'pink' }}>
        {count}
      </p>

    </div>
  );
}
