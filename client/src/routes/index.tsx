import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Routes";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={Home} isPrivate />
      <Route component={Login} />
    </Switch>
  );
}
