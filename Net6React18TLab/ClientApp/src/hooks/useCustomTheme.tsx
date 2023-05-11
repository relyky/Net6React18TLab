/*
 * To customize the theme: Dark mode with a custom palette
 * 參考：[Dark mode with a custom palette](https://mui.com/material-ui/customization/dark-mode/#dark-mode-with-a-custom-palette)
 * 參考：[Toggling color mode](https://mui.com/material-ui/customization/dark-mode/#toggling-color-mode)
 */
import type { ReactNode } from 'react'
import React, { useContext, useReducer } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { zhTW } from '@mui/material/locale'
import { CssBaseline, IconButton } from '@mui/material'
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

//# first, create empty context, 建構時給與初始值以避免當掉。
const CustomThemeContext = React.createContext({
  colorMode: 'white',
  toggleColorMode: () => { }
});

export function useCustomTheme() {
  return useContext(CustomThemeContext)
}

export const CustomThemeProvider = (props: { children: ReactNode }) => {
  //# 真正共享的實體在此建立
  const [colorMode, toggleColorMode] = useReducer((mode) => mode === 'white' ? 'dark' : 'white', 'white')

  return (
    <CustomThemeContext.Provider value={{ colorMode, toggleColorMode }}>
      <ThemeProvider theme={colorMode === 'dark' ? darkTheme : whiteTheme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </CustomThemeContext.Provider>)
}

//=============================================================================
//## helper component

//# 用來切換 while/dark theme
export const ToggleBrightnessButton = () => {
  const themeMode = useCustomTheme()
  return (
    <IconButton onClick={themeMode.toggleColorMode} color="inherit" >
      {themeMode.colorMode === 'dark' ? <DarkIcon /> : <WhiteIcon />}
    </IconButton>
  )
}
