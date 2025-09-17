import {useContext} from 'react'
import ThemeContext from '../context/ThemeContextImport'
export function useTheme() {
  const {mode, toggleTheme, theme} = useContext(ThemeContext);
  return {mode, toggleTheme, theme}
}