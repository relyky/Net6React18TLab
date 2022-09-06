import type { FC } from 'react'
import React from 'react'
import { Box } from '@mui/material'
import Banner from './Banner'

const Layout: FC<{
  children: React.ReactNode
}> = (props) => {
  return (
    <Box>
      <Banner />
      <main>
        {props.children}
      </main>
    </Box>
  )
}

export default Layout;