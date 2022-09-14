import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store/store'
import App from './App'
import reportWebVitals from './reportWebVitals'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { CustomThemeProvider } from 'hooks/useCustomTheme'
// @MUI Layout
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
// CSS: Fonts to support Material Design, ref:https://mui.com/material-ui/react-typography/
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@sweetalert2/theme-material-ui'
// Site CSS
import './index.css'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

//※注意：<React.StrictMode>會讓 useState,useEffect 初始化執行兩次，故不可使用。
root.render(
  <Provider store={store}>
    <CacheProvider value={muiCache}>
      <BrowserRouter basename={baseUrl}>
        <CustomThemeProvider>
          <App />
        </CustomThemeProvider>
      </BrowserRouter>
    </CacheProvider>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
