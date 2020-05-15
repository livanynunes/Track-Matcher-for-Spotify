import React from "react";
import "./assets/styles.css";
import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./assets/theme";
import styled from "styled-components";
import bgImage from "./assets/img/bg.png";
import { Router } from "react-router-dom";
import history from "./services/history";
import Routes from "./routes";

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
        <Router history={history}>
          <Routes />
        </Router>
      </ThemeProvider>
    </AppStyled>
  );
}

export default App;
