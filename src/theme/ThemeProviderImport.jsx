import React, { useState, useEffect } from "react";
import light from "./light";
import dark from "./dark";
import ThemeContext from '../context/ThemeContextImport'


export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    // busca no localStorage na inicialização
    const saved = localStorage.getItem("theme-mode");
    return saved ? saved : "light";
  });

  useEffect(() => {
    // aplica as variáveis CSS do tema atual
    const theme = mode === "light" ? light : dark;
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    // salva no localStorage
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}


