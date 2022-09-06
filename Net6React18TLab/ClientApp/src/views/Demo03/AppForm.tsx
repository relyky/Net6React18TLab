import React, { useState } from 'react'
import IconDemo from './IconDemo';
import TypoDemo from './TypoDemo'

export default function Demo03_AppForm() {
  const [count, setCount] = useState(17)

  return (
    <div style={{ padding: '0 16px' }}>
      <h1>Demo03 : Material UI 展示</h1>
      <TypoDemo />
      <IconDemo />
    </div>
  );
}
