import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import NavMenu from './NavMenu'
// hooks
import { useAppSelector } from 'store/hooks'
import { ToggleBrightnessButton } from 'hooks/useCustomTheme'
// CSS icons
import AdbIcon from '@mui/icons-material/Adb'
import AccountIcon from '@mui/icons-material/AccountCircle'
import GuestIcon from '@mui/icons-material/EmojiPeople'

export default function Banner() {
  const account = useAppSelector(s => s.account)

  const f_login = account.loginUserId !== ''

  return (
    <AppBar position="static">
      <Toolbar>
        <AdbIcon />
        <Typography variant="h6">
          My First React.v18 App
        </Typography>

        <NavMenu />

        <div style={{ marginLeft: 'auto' }}>
          {f_login && <IconButton color="inherit">
            <AccountIcon />
            <Typography variant="body1" component="span" noWrap>{account.loginUserName}</Typography>
          </IconButton>}
          {!f_login && <IconButton color="inherit">
            <GuestIcon />
          </IconButton>}
        </div>
        <ToggleBrightnessButton />
      </Toolbar>
    </AppBar>
  )
}
