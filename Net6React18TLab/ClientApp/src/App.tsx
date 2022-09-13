import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes'
import Layout from './views/Layout'
import NoLayout from './views/NoLayout'
import LoginView from './views/Account/Login'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<NoLayout><LoginView /></NoLayout>} />

      {AppRoutes.map((route, index) => {
        const { element, ...rest } = route;
        return <Route key={index} {...rest} element={<Layout>{element}</Layout>} />;
      })}

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

//=========================================================
const NotFound: FC = () => {
  return (
    <div>
      <h1>404 NotFound</h1>
      <h2>Your Princess Is In Another Castle!</h2>
    </div>
  )
}
