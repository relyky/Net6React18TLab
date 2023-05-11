import type { MouseEvent } from 'react'
import React, { useState, useRef } from 'react'
import { Box, Button, Menu, MenuItem, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import DownIcon from '@mui/icons-material/ArrowDropDown'

export default function NavMenu() {
  const refMenuGroupA = useRef(null);
  const refMenuGroupB = useRef(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function openMenu(e: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <Button to="/" component={RouterLink} color="inherit" sx={{ ml: 1 }}>
        Home
      </Button>

      <Button ref={refMenuGroupA} onClick={openMenu} color="inherit" sx={{ ml: 1 }} endIcon={<DownIcon />}>
        Demo A
      </Button>
      <Menu
        anchorEl={refMenuGroupA.current}
        open={(!!anchorEl && anchorEl === refMenuGroupA.current)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu} component={RouterLink} to="/demo01">Demo01</MenuItem>
        <MenuItem onClick={closeMenu} component={RouterLink} to="/demo02">Demo02</MenuItem>
        <MenuItem onClick={closeMenu} component={RouterLink} to="/demo03">Demo03</MenuItem>
        <MenuItem onClick={closeMenu} component={RouterLink} to="/demo04">Demo04</MenuItem>
      </Menu>

      <Button ref={refMenuGroupB} onClick={openMenu} color="inherit" sx={{ ml: 1 }} endIcon={<DownIcon />}>
        Demo B
      </Button>
      <Menu
        anchorEl={refMenuGroupB.current}
        open={(!!anchorEl && anchorEl === refMenuGroupB.current)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu} component={RouterLink} to="/demo01">展示功能 01</MenuItem>
        <MenuItem onClick={closeMenu} component={RouterLink} to="/demo02">展示功能 02</MenuItem>
        <MenuItem onClick={closeMenu} component={RouterLink} to="/demo03">展示功能 03</MenuItem>
        <MenuItem onClick={closeMenu} component={RouterLink} to="/demo04">展示功能 04</MenuItem>
      </Menu>
    </Box>
  )
}
