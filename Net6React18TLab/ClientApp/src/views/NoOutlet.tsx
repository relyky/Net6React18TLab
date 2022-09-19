import type { FC } from 'react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Overlay from './Overlay'

const NoLayout: FC = () => {
  return (
    <main>
      <Outlet />
      <Overlay />
    </main>
  )
}

export default NoLayout;