/*
 * 一些客製化的資源
 */
import type { ReactChild } from 'react'
import React, { useContext, useReducer } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { zhTW } from '@mui/material/locale'

//-----------------------------------------------------------------------------
//## Resource

const theme = createTheme(
  {
    palette: {
      primary: { main: '#BF4690' },
    },
  },
  zhTW, // Locale text:Use the theme to configure the locale text globally.
);

const darkTheme = createTheme(
  {
    palette: {
      mode: 'dark',
    },
  },
  zhTW, // Locale text:Use the theme to configure the locale text globally.
);

//-----------------------------------------------------------------------------
//## useContext

// first, create empty context
const CustomThemeContext = React.createContext({
  colorMode: 'white',
  toggleColorMode: () => { }
});

export function useCustomTheme() {
  return useContext(CustomThemeContext)
}

export const CustomThemeProvider = (props: { children: ReactChild }) => {
  const [colorMode, toggleColorMode] = useReducer((mode) => mode === 'white' ? 'dark' : 'white', 'white')

  return (
    <CustomThemeContext.Provider value={{ colorMode, toggleColorMode }}>
      <ThemeProvider theme={colorMode === 'dark' ? darkTheme : theme}>
        {props.children}
      </ThemeProvider>
    </CustomThemeContext.Provider>)
}
