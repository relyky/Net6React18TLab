import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import NavMenu from './NavMenu'
// hooks
import { ToggleBrightnessButton } from 'hooks/useCustomTheme'
// CSS icons
import AdbIcon from '@mui/icons-material/Adb'

export default function Banner() {
  return (
    <AppBar position="static">
      <Toolbar>
        <AdbIcon />
        <Typography variant="h6">
          My First React.v18 App
        </Typography>
        <NavMenu />
        <ToggleBrightnessButton />
      </Toolbar>
    </AppBar>
  )
}
