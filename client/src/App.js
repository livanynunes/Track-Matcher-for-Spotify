import React from "react";
import { Home } from "./pages/Home";
import "./App.css";
import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";

function App() {
  return (
    <div className="App">
      <header></header>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </div>
  );
}

export default App;
