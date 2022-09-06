import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store/store'
import App from './App'
import reportWebVitals from './reportWebVitals'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
// @MUI Layout
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { zhTW } from '@mui/material/locale'
// CSS: Fonts to support Material Design, ref:https://mui.com/material-ui/react-typography/
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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

const theme = createTheme(
  {
    palette: {
      primary: { main: '#BF4690' },
    },
  },
  zhTW, // Locale text:Use the theme to configure the locale text globally.
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={theme}>
          <BrowserRouter basename={baseUrl}>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
