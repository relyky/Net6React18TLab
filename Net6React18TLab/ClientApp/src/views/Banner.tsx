import { FC } from 'react'
import React, { useState, useMemo } from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import NavMenu from './NavMenu'
import { intervalToDuration, parseISO } from 'date-fns'
// hooks
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { ToggleBrightnessButton } from 'hooks/useCustomTheme'
import { useInterval } from 'hooks/useWindowResource'
import { signOutAsync, AuthStatus } from 'store/accountSlice'
// CSS icons
import AdbIcon from '@mui/icons-material/Adb'
import AccountIcon from '@mui/icons-material/AccountCircle'
import GuestIcon from '@mui/icons-material/EmojiPeople'
import LoopIcon from '@mui/icons-material/Loop'
import LogoutIcon from '@mui/icons-material/Logout';

export default function Banner() {
  const account = useAppSelector(s => s.account)
  const dispatch = useAppDispatch()

  function handleSignOut() {
    dispatch(signOutAsync())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <AdbIcon />
        <Typography variant="h6">
          My First React.v18 App
        </Typography>

        <NavMenu />

        <div style={{ marginLeft: 'auto' }}>
          {account.status === AuthStatus.Authed && <>
            <IconButton color="inherit">
              <AccountIcon />
            </IconButton>
            <Typography variant="body1" component="span" noWrap>{account.loginUserName}</Typography>
            <SessionDownCounter />
            <IconButton color="inherit" onClick={handleSignOut} title="登出">
              <LogoutIcon />
            </IconButton>
          </>}

          {account.status === AuthStatus.Authing && <IconButton color="inherit">
            <LoopSpinIcon />
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

//-----------------------------------------------------------------------------
const Zero_Duration = { hours: 0, minutes: 0, seconds: 0 };

// auth. session down-counter
const SessionDownCounter: FC = () => {
  const account = useAppSelector(s => s.account)
  const [downCounter, setDownCounter] = useState<Duration>(Zero_Duration)

  const expiredTime = useMemo<Date | null>(() => {
    if (account.status === AuthStatus.Authed) {
      return parseISO(account.expiredTime as string)
    }
    return null;
  }, [account.expiredTime])

  useInterval(1000, () => {
    if (account.status === AuthStatus.Authed) {
      const start = new Date()
      const end = expiredTime as Date
      if (start >= end) {
        setDownCounter(Zero_Duration)
        return
      }
      setDownCounter(intervalToDuration({ start, end }))
    }
  })

  // to render
  if (account.status !== AuthStatus.Authed)
    return (<></>);

  if (downCounter.hours && downCounter.hours > 0) {
    return (
      <Typography variant="caption" component="span" noWrap>
        &nbsp;{downCounter.hours}h:{downCounter.minutes}m
      </Typography>
    )
  }

  return (
    <Typography variant="caption" component="span" noWrap>
      &nbsp;{downCounter.minutes}:{downCounter.seconds}
    </Typography>
  )
}

//-----------------------------------------------------------------------------
const LoopSpinIcon: FC = () => (
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
)
