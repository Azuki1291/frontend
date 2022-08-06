import React from "react";

import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// ** Declare Theme Provider
const MaterialThemeProvider = ({ children }) => {
  const themeConfig = {
    palette: {
      mode: "light",
      // primary: {
      //   main: "#32498e",
      // },
      // background: {
      //   default: "#222b45",
      //   paper: "#222b45"
      // }
    },
    typography: {
      fontFamily: "'Proxima Nova Rg', sans-serif",
      fontSize: 14,
    },
  };
  const theme = createTheme(themeConfig);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
export default MaterialThemeProvider;
