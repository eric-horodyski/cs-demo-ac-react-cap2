import { PrivateRoute } from "@ionic-enterprise/auth-react";
import React from "react";
import { useContext } from "react";
import { Redirect, RouteProps } from "react-router";
import { SessionVaultContext } from "./SessionVaultContext";

interface PrivateRouteProps extends RouteProps {
  loginPath?: string;
  initializingComponent?: React.ComponentType;
}

export const SessionRoute: React.FC<PrivateRouteProps> = React.memo(
  ({ loginPath, ...props }) => {
    const { isLocked } = useContext(SessionVaultContext);

    if (!isLocked) {
      return <PrivateRoute {...props} />;
    } else {
      return <Redirect to={loginPath!} />;
    }
  }
);
