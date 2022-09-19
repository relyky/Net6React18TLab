import { FC } from 'react'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes'
import MainOutlet from './views/MainOutlet'
import NoOutlet from './views/NoOutlet'
import LoginView from './views/Account/Login'
import { getAuthInfoAsync } from 'store/accountSlice'
import { useAppDispatch } from './store/hooks';

export default function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAuthInfoAsync())
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<NoOutlet />}>
        <Route index element={<LoginView />} />
      </Route>

      <Route path="/" element={<MainOutlet />}>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Route>

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
