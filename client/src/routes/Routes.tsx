import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface IRouteWrapper extends RouteProps {
  isPrivate: boolean;
}

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}: IRouteWrapper) {
  const loggedIn = true;

  /**
   * Redirect user to SignIn page if he tries to access a private      route
   * without authentication.
   */

  if (isPrivate && !loggedIn) {
    return <Redirect to="/" />;
  }
  /**
   * Redirect user to Main page if he tries to access a non private route
   * (SignIn or SignUp) after being authenticated.
   */

  if (!isPrivate && loggedIn) {
    return <Redirect to="/home" />;
  }

  /**
   * If not included on both previous cases, redirect user to the desired route.
   */

  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};
RouteWrapper.defaultProps = {
  isPrivate: false,
};
