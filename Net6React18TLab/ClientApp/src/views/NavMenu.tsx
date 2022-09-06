import type { ReactChild, FC } from 'react'
import React, { useState } from 'react'
import { Box, Button, Menu, MenuItem, Link } from '@mui/material'
import DownIcon from '@mui/icons-material/ArrowDropDown'

export default function NavMenu() {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <Button href="/" color="inherit" sx={{ ml: 1 }}>
        Home
      </Button>
      <MenuGroup label="Demo">
        <MenuItem><Link href="/demo01" underline="none">Demo01</Link></MenuItem>
        <MenuItem><Link href="/demo02" underline="none">Demo02</Link></MenuItem>
        <MenuItem><Link href="/demo03" underline="none">Demo03</Link></MenuItem>
      </MenuGroup>
    </Box>
  )
}

const MenuGroup: FC<{
  label: string,
  children: ReactChild | ReactChild[]
}> = (props) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = (e) => setAnchorEl(e.currentTarget)
  const handleClose = (_) => setAnchorEl(null)

  return (
    <>
      <Button onClick={handleClick} color="inherit" sx={{ ml: 1 }} endIcon={<DownIcon />}>
        {props.label}
      </Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        {props.children}
      </Menu>
    </>
  )
}
