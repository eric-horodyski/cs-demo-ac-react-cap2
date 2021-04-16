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
import AuthConnectContainer from "./auth/AuthConnectContainer";
import { SessionVaultProvider } from "./vault/SessionVaultContext";

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <AuthConnectContainer>
          <SessionVaultProvider>
            <Switch>
              <PrivateRoute path="/tabs">
                <Tabs />
              </PrivateRoute>
              <Route path="/login">
                <Login />
              </Route>
              <Redirect from="/" to="/login" exact />
            </Switch>
          </SessionVaultProvider>
        </AuthConnectContainer>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
