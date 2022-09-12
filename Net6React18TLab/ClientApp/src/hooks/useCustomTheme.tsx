/*
 * To customize the theme: Dark mode with a custom palette
 * 參考：[Dark mode with a custom palette](https://mui.com/material-ui/customization/dark-mode/#dark-mode-with-a-custom-palette)
 * 參考：[Toggling color mode](https://mui.com/material-ui/customization/dark-mode/#toggling-color-mode)
 */
import type { ReactChild } from 'react'
import React, { useContext, useReducer } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { zhTW } from '@mui/material/locale'
import { IconButton } from '@mui/material'
// CSS
import DarkIcon from '@mui/icons-material/Brightness4'
import WhiteIcon from '@mui/icons-material/Brightness7'

//-----------------------------------------------------------------------------
//## Resource

const whiteTheme = createTheme(
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
      <ThemeProvider theme={colorMode === 'dark' ? darkTheme : whiteTheme}>
        {props.children}
      </ThemeProvider>
    </CustomThemeContext.Provider>)
}

//=============================================================================
//## helper component

export const ToggleBrightnessButton = () => {
  const themeMode = useCustomTheme()
  return (
    <IconButton onClick={themeMode.toggleColorMode} color="inherit" >
      {themeMode.colorMode === 'dark' ? <DarkIcon /> : <WhiteIcon />}
    </IconButton>
  )
}