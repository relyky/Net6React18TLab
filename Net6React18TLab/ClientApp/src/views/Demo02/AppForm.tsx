import React, { useState } from 'react';
import { Counter as ReduxCounter } from './Counter'

export default function Demo02_AppForm() {
  const [count, setCount] = useState(17)

  return (
    <div style={{ padding: '0 16px' }}>
      <h1>我是Demo02</h1>

      <ReduxCounter  />

    </div>
  );
}
