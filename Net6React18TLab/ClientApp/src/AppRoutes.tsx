import React from 'react'
import Home from './views/Home/Home'
import Demo01 from './views/Demo01/AppForm'
import Demo02 from './views/Demo02/AppForm'
import Demo03 from './views/Demo03/AppForm'
import Demo04 from './views/Demo04/AppForm'

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/demo01',
    element: <Demo01 />
  },
  {
    path: '/demo02',
    element: <Demo02 />
  },
  {
    path: '/demo03',
    element: <Demo03 />
  },
  {
    path: '/demo04',
    element: <Demo04 />
  },
];

export default AppRoutes;
