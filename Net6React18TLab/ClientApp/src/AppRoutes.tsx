import React from 'react'
import Home from './views/Home/Home'
import Demo01 from './views/Demo01/AppForm'
//import { Counter } from './views/ReduxCounter/Counter'

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/demo01',
    element: <Demo01 />
  },
];

export default AppRoutes;
