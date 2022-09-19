import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import NavMenu from './NavMenu'
// hooks
import { useAppSelector } from 'store/hooks'
import { ToggleBrightnessButton } from 'hooks/useCustomTheme'
// CSS icons
import { AuthStatus } from 'store/accountSlice'
import AdbIcon from '@mui/icons-material/Adb'
import AccountIcon from '@mui/icons-material/AccountCircle'
import GuestIcon from '@mui/icons-material/EmojiPeople'
import LoopIcon from '@mui/icons-material/Loop'

export default function Banner() {
  const account = useAppSelector(s => s.account)

  return (
    <AppBar position="static">
      <Toolbar>
        <AdbIcon />
        <Typography variant="h6">
          My First React.v18 App
        </Typography>

        <NavMenu />

        <div style={{ marginLeft: 'auto' }}>
          {account.status === AuthStatus.Authed && <IconButton color="inherit">
            <AccountIcon />
            <Typography variant="body1" component="span" noWrap>{account.loginUserName}</Typography>
          </IconButton>}
          {account.status === AuthStatus.Authing && <IconButton color="inherit">
            <LoopIcon sx={{
              animation: "spin 2s linear infinite",
              "@keyframes spin": {
                "0%": {
                  transform: "rotate(360deg)",
                },
                "100%": {
                  transform: "rotate(0deg)",
                },
              },
            }} />
          </IconButton>}
          {account.status === AuthStatus.Guest && <IconButton color="inherit">
            <GuestIcon />
          </IconButton>}
        </div>
        <ToggleBrightnessButton />
      </Toolbar>
    </AppBar>
  )
}
