import React from "react";
import { Home } from "./pages/Home";
import "./assets/styles.css";
import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./assets/theme";
import styled from "styled-components";
import bgImage from "./assets/img/bg.png";

const AppStyled = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${bgImage});
  background-position: center top;
  background-repeat: no-repeat;
  background-size: 100% auto;
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
