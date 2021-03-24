import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { IonApp, isPlatform } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  AuthConnectProvider,
  PrivateRoute,
} from "@ionic-enterprise/auth-react";
import Tabs from "./pages/Tabs";
import Login from "./pages/Login";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const platform = isPlatform("capacitor") ? "capacitor" : "web";
const redirectUri = isPlatform("capacitor")
  ? "msauth://login"
  : "http://localhost:8100/login";
const logoutUrl = isPlatform("capacitor")
  ? "msauth://login"
  : "http://localhost:8100/login";

const AuthConnectContainer: React.FC = () => {
  const location = useLocation();
  return (
    <AuthConnectProvider
      checkSessionOnChange={location.pathname}
      loginPath="/login"
      logLevel="DEBUG"
      authConfig="auth0"
      clientID="1XaS52xS0XDdE0NUYKEEnF047AC53USl"
      discoveryUrl="https://dev-j3wl8n0b.auth0.com/.well-known/openid-configuration"
      scope="openid offline_access email picture profile"
      audience=""
      redirectUri={redirectUri}
      logoutUrl={logoutUrl}
      platform={platform}
      iosWebView="private"
    >
      <Switch>
        <PrivateRoute path="/tabs">
          <Tabs />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Redirect from="/" to="/login" exact />
      </Switch>
    </AuthConnectProvider>
  );
};

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <AuthConnectContainer />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
