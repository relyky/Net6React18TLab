import type { FC } from 'react'
import React from 'react'

const NoLayout: FC<{
  children: React.ReactNode
}> = (props) => {
  return (
    <main>
      {props.children}
    </main>
  )
}

export default NoLayout;