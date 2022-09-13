import type { FC } from 'react'
import React from 'react'
import { Box } from '@mui/material'
import Banner from './Banner'
import { Outlet } from 'react-router-dom'

const Layout: FC = () => {
  return (
    <Box>
      <Banner />
      <main>
        <Outlet />
      </main>
    </Box>
  )
}

export default Layout;