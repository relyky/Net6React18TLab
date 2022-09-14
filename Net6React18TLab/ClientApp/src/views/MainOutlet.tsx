import type { FC } from 'react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Banner from './Banner'
import Overlay from './Overlay'

const Layout: FC = () => {
  return (
    <Box>
      <Banner />
      <main>
        <Outlet />
      </main>
      <Overlay />
    </Box>
  )
}

export default Layout;