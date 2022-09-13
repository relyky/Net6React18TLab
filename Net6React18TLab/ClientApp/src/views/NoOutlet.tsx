import type { FC } from 'react'
import React from 'react'
import { Outlet } from 'react-router-dom'

const NoLayout: FC = () => {
  return (
    <main>
      <Outlet />
    </main>
  )
}

export default NoLayout;