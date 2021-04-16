import React from "react";
import { AuthConnectProvider } from "@ionic-enterprise/auth-react";
import { isPlatform } from "@ionic/react";
import { useLocation } from "react-router";
import { SessionVault } from "../vault/SessionVault";

const platform = isPlatform("capacitor") ? "capacitor" : "web";
const redirectUri = isPlatform("capacitor")
  ? "msauth://login"
  : "http://localhost:8100/login";
const logoutUrl = isPlatform("capacitor")
  ? "msauth://login"
  : "http://localhost:8100/login";

const AuthConnectContainer: React.FC = ({ children }) => {
  const location = useLocation();
  return (
    <AuthConnectProvider
      checkSessionOnChange={location.pathname}
      loginPath="/login"
      logLevel="ERROR"
      authConfig="auth0"
      clientID="1XaS52xS0XDdE0NUYKEEnF047AC53USl"
      discoveryUrl="https://dev-j3wl8n0b.auth0.com/.well-known/openid-configuration"
      scope="openid offline_access email picture profile"
      audience=""
      redirectUri={redirectUri}
      logoutUrl={logoutUrl}
      platform={platform}
      iosWebView="private"
      tokenStorageProvider={SessionVault.getInstance()}
    >
      {children}
    </AuthConnectProvider>
  );
};
export default AuthConnectContainer;
