import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const NavMenu: FC = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>&nbsp;|&nbsp;
        <Link to="/demo01">Demo01</Link>&nbsp;|&nbsp;
      </nav>
    </header>
  )
}

export default NavMenu;