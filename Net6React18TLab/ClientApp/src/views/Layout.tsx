import React, { FC } from 'react'
import NavMenu from './NavMenu'

const Layout: FC<{
  children: React.ReactNode
}> = (props) => {
  return (
    <div>
      <NavMenu />
      <div className="container">
        {props.children}
      </div>
    </div>
  )
}

export default Layout;