import { FC } from 'react'
import React, { useState, useEffect, useMemo } from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import NavMenu from './NavMenu'
import { differenceInMinutes, intervalToDuration, Interval, parseISO } from 'date-fns'
// hooks
import { useAppSelector } from 'store/hooks'
import { ToggleBrightnessButton } from 'hooks/useCustomTheme'
import { useInterval } from 'hooks/useWindowResource'
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
            <SessionDownCounter />
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

//-----------------------------------------------------------------------------
// auth. session down-counter
const SessionDownCounter: FC = () => {
  const account = useAppSelector(s => s.account)
  const [downCounter, setDownCounter] = useState<Duration>({ hours:0, minutes: 0, seconds: 0 })

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
        setDownCounter({ hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setDownCounter(intervalToDuration({ start, end }))
    }
  })

  // to render
  if (account.status !== AuthStatus.Authed)
    return (<></>);

  return (
    <Typography variant="caption" component="span" noWrap>
      &nbsp;{(downCounter.hours as number) > 0 ? `${downCounter.hours}:` : ''}{`${downCounter.minutes}:${downCounter.seconds}`}
    </Typography>
  )
}

//-----------------------------------------------------------------------------

