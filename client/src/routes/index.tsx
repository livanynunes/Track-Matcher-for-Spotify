import React from "react";
import { Switch } from "react-router-dom";
import { RouteWrapper } from "./Routes";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

export default function Routes() {
  return (
    <Switch>
      <RouteWrapper path="/" exact component={Login} />
      <RouteWrapper path="/home" component={Home} isPrivate />
      <RouteWrapper component={Login} />
    </Switch>
  );
}
