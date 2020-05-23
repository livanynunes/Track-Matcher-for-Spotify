import React from "react";
import { Switch } from "react-router-dom";
import { RouteWrapper } from "./Routes";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Final } from "../pages/Final";

export default function Routes() {
  return (
    <Switch>
      <RouteWrapper path="/" exact component={Login} />
      <RouteWrapper path="/home" component={Home} isPrivate />
      <RouteWrapper path="/final" component={Final} />
      <RouteWrapper component={Login} />
    </Switch>
  );
}
