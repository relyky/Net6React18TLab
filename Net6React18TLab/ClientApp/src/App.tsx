import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes'
import Layout from './views/Layout'

export default function App() {
  return (
    <Layout>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
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
