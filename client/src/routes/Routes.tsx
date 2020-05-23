import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface IRouteWrapper extends RouteProps {
  isPrivate: boolean;
}

function getUrlParams(search: string): any {
  let hashes = search.slice(search.indexOf("?") + 1).split("&");
  return hashes.reduce((params, hash) => {
    let [key, val] = hash.split("=");
    return Object.assign(params, { [key]: decodeURIComponent(val) });
  }, {});
}

// console.log(getUrlParams(window.location.search));

const params = getUrlParams(window.location.search);
const token = params.access_token;

export const RouteWrapper = ({
  component: Component,
  isPrivate,
  ...rest
}: IRouteWrapper) => {
  let isLoggedIn;

  isLoggedIn = token ? true : false;

  console.log(`isloggedin:${isLoggedIn}`);
  console.log(`token:${token}`);

  if (isPrivate && !isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (!isPrivate && isLoggedIn) {
    return <Redirect to="/home" />;
  }

  return <Route {...rest} component={Component} />;
};

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};
RouteWrapper.defaultProps = {
  isPrivate: false,
};
