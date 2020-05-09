import React from "react";
import { Home } from "./pages/Home";
import "./assets/styles.css";
import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./assets/theme";
import styled from "styled-components";

const AppStyled = styled.div`
  height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <AppStyled>
      <header></header>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </AppStyled>
  );
}

export default App;
